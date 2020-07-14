import Head from "next/head";
import React from "react";
import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  return <>
      <Head>
        <title>Gloria's Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <Component {...pageProps}/>
    </>
}