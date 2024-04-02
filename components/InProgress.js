import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
function InProgress({ type }) {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {type === "loading" ? (
        <CircularProgress size={100} />
      ) : type === "redirecting" ? (
        <>
          <CircularProgress size={100} />
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
