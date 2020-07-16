import Head from 'next/head';
import 'styles/global.scss';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > a {
    color: black;
    margin: 0 10px;
    :hover {
      color: gray;
    }
  }
`;

export default function MyApp({Component, pageProps}) {
  console.log(Component);
  console.log(pageProps);
  return (<>
    <Head>
      <title>Gloria</title>
      <meta name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
    </Head>
    <Nav>
      <Link href={'/'}><a>Home</a></Link>
      <Link href={'/posts'}><a>Blogs</a></Link>
      <a href='https://github.com/gloriacc' target='_blank'>Github</a>
      {pageProps.user ? <><a>{pageProps.user.username}</a><Link href={'/sign_out'}><a>Sign Out</a></Link></>
        :<><Link href={'/sign_in'}><a>Sign In</a></Link><Link href={'/sign_up'}><a>Sign Up</a></Link></>}
    </Nav>
    <Component {...pageProps} />
  </>)
}