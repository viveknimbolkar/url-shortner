import styles from "./index.module.css";
export default function Home() {
  return (
    <section className={`w-screen h-screen ${styles.homebackground}`}>
      <nav
        className={`${styles.navbar} flex justify-between px-20 text-white p-4`}
      >
        <h1 className="font-bold text-3xl">ShortURL</h1>
        <div className="flex gap-2">
          <button className="rounded-full bg-blue px-3 py-2">Login</button>
          <button className="rounded-full bg-white text-black px-3 py-2">
            Sign Up
          </button>
        </div>
      </nav>
      <div className=" h-[90%] flex justify-center items-center">
        <div>
          <h1 className="text-white text-6xl font-bold text-center">
            Shorten your URL
          </h1>
          <p className="text-white text-center mt-5">
            ShortURL allows you to shorten long URL into a short one
          </p>
          <div className="flex justify-center mt-10">
            <input
              type="text"
              placeholder="Enter your URL"
              className=" w-full outline-none p-3 rounded-l-full"
            />
            <button className="rounded-r-full border-t-2 border-b-2 border-r-2 bg-blue w-48 hover:bg-white hover:text-black duration-300 hover:scale-105 text-white px-3 py-2">
              Shorten
            </button>
          </div>
          <div className="flex justify-between mt-4 p-1 items-center  rounded-full bg-white text-black">
            <p className=" text-lg w-full text-center">
              https://google.com/laksdfjdlskdf
            </p>
            <button className="bg-[#1A3B80] px-4 py-2 rounded-full text-white">
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
