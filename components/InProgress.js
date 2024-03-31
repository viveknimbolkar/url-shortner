import React from "react";
function InProgress({ type }) {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {type === "loading" ? (
        <h1>Loading...</h1>
      ) : type === "redirecting" ? (
        <>
          <h1>Redirecting...</h1>
        </>
      ) : type === "error" ? (
        <>
          <h1 className="text-red-500">Error,</h1> <br />
          We will up soon!{" "}
        </>
      ) : (
        <div>
          <h1 className="text-center font-bold text-3xl">
            Oops! Page Not Found
          </h1>
        </div>
      )}
    </div>
  );
}

export default InProgress;
