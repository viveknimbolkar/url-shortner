import React from "react";
import SideBar from "./sidebar";

function RootLayout({ children, heading }) {
  return (
    <div className=" h-screen overflow-hidden md:flex">
      <SideBar />
      <div className="w-full p-5 font-bold bg-slate-300  h-screen overflow-y-auto">
        <h1 className="text-3xl mb-3">{heading}</h1>
        {children}
      </div>
    </div>
  );
}

export default RootLayout;
