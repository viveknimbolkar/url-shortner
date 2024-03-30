import React from "react";
// import Lottie from "react-lottie-player";
import redirecting from "../public/assets/lottie/redirecting.json";
import loading from "../public/assets/lottie/loading.json";
import error from "../public/assets/lottie/error.json";
import notFound from "../public/assets/lottie/404.json";

function InProgress({ type }) {
  return (
    <div>loading...</div>
    // <div className="flex justify-center items-center h-screen w-full">
    //   {type === "loading" ? (
    //     <>
    //       <Lottie
    //         loop
    //         animationData={loading}
    //         play
    //         style={{ width: 300, height: 300 }}
    //       />
    //     </>
    //   ) : type === "redirecting" ? (
    //     <Lottie
    //       loop
    //       animationData={redirecting}
    //       play
    //       style={{ width: 400, height: 400 }}
    //     />
    //   ) : type === "error" ? (
    //     <Lottie
    //       loop
    //       animationData={error}
    //       play
    //       style={{ width: 500, height: 500 }}
    //     />
    //   ) : (
    //     <div>
    //       <Lottie
    //         loop
    //         animationData={notFound}
    //         play
    //         style={{ width: 300, height: 300 }}
    //       />
    //       <h1 className="text-center font-bold text-3xl">
    //         Oops! Page Not Found
    //       </h1>
    //     </div>
    //   )}
    // </div>
  );
}

export default InProgress;
