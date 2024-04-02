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
  );
}
