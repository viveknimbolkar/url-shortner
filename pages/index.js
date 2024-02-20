import { useContext, useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { AccountContext } from "@/context/account";
import Header from "@/components/header";
import { shortenURL } from "@/components/api";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const { isLoggedIn, user } = useContext(AccountContext);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleShorten = async () => {
    if (!url) {
      return;
    }
    try {
      const response = await shortenURL({ user_id: user.sub, url });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={`w-screen h-screen ${styles.homebackground}`}>
      <Header isHomePage={true} />

      <div className=" h-[80%] flex justify-center items-center">
        <div>
          <h1 className="text-white text-6xl font-bold text-center">
            Shorten your URL
          </h1>
          <p className="text-white text-center mt-5">
            ShortURL allows you to shorten long URL into a short one
          </p>
          <div className="flex justify-center mt-10">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              placeholder="Enter your URL"
              className={` w-full outline-none p-3 rounded-l-full`}
            />
            <button
              onClick={handleShorten}
              className="rounded-r-full border-t-2 border-b-2 border-r-2 bg-blue w-48 hover:bg-white hover:text-black duration-300 hover:scale-105 text-white px-3 py-2"
            >
              Shorten
            </button>
          </div>
          {shortUrl !== "" && (
            <div className="flex justify-between mt-4 p-1 items-center  rounded-full bg-white text-black">
              <p className=" text-lg w-full text-center">{shortUrl}</p>
              <button
                onClick={handleCopy}
                className="bg-[#1A3B80] px-4 py-2 rounded-full text-white"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
