import RootLayout from "@/components/RootLayout";
import isAuth from "@/components/isAuth";
import SideBar from "@/components/sidebar";
import React, { useState } from "react";

function DashBoard() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };
  const handleShorten = async () => {
    if (!url) {
      return;
    }
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RootLayout heading={"Dashboard"}>
        <div className="rounded-md bg-color-v4 p-4">
          <h1 className="text-white text-xl mb-2 text-center">Shorten URL</h1>
          <div className="flex justify-center">
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
      </RootLayout>
    </>
  );
}

export default isAuth(DashBoard);
