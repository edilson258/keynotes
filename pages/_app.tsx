import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>

  <Head>
    <meta name="theme-color"  content="#0ea5e9"/>
  </Head>

    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>

  </>
  );
}

export default MyApp;
