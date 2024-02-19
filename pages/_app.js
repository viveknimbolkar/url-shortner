import "@/styles/globals.css";
import { AccountProvider } from "@/context/account";
import "@/styles/index.css";
import {  AlertMessageProvider } from "@/context/alert-context";
export default function App({ Component, pageProps }) {
  return (
    <AlertMessageProvider>
      <AccountProvider>
        <Component {...pageProps} />
      </AccountProvider>
    </AlertMessageProvider>
  );
}
