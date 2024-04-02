import { useState, useEffect } from "react";
import SideBar from "./sidebar";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

function RootLayout({ children, heading }) {
  const [loading, setLoading] = useState(false);

  // Show a loading indicator when the route changes
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <div className=" h-screen overflow-hidden md:flex">
      <SideBar />
      <div className="w-full p-5 font-bold bg-slate-300  h-screen overflow-y-auto">
        <h1 className="text-3xl mb-3">{heading}</h1>

        {loading ? (
          <section className="h-screen w-full flex items-center justify-center">
            <CircularProgress size={100} />
          </section>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default RootLayout;
