import Head from 'next/head';
import 'styles/global.scss';
import React from 'react';
import 'highlight.js/styles/darcula.css';
import Layout from '../components/Layout';
import App from 'next/app';
import favicon from '../public/favicon.ico';

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (<>
      <Head>
        <title>Gloria</title>
        <link rel="icon" href={favicon}/>
        <meta name="viewport"
              content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
      </Head>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>)
  }
}