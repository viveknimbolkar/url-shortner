import "@/styles/globals.css";
import { AccountProvider } from "@/context/account";
export default function App({ Component, pageProps }) {
  return (
    <AccountProvider>
      <Component {...pageProps} />
    </AccountProvider>
  );
}
