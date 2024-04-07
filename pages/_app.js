import "@/styles/globals.css";
import { AccountProvider } from "@/context/account";
import "@/styles/index.css";
import React from "react";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  return (
    <AccountProvider>
      <main>
        <Component {...pageProps} />
        <Toaster position="bottom-left" />
      </main>
    </AccountProvider>
    // <div className="h-screen w-full flex items-center justify-center">
    //   <h1 className="text-3xl text-center">
    //     We are under maintainance. <br />
    //     We will back soon :-{"( "}
    //   </h1>
    // </div>
  );
}
