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

type Props = {
  pageProps: any
}

const Layout:React.FC<Props> = (props) => {
  return (
    <div>
      <Nav>
        <Link href={'/'}><a>Home</a></Link>
        <Link href={'/posts'}><a>Blogs</a></Link>
        <a href='https://github.com/gloriacc' target='_blank'>Github</a>
        {props.pageProps.user ? <><a>{props.pageProps.user.username}</a><Link href={'/sign_out'}><a>Sign Out</a></Link></>
          :<><Link href={'/sign_in'}><a>Sign In</a></Link><Link href={'/sign_up'}><a>Sign Up</a></Link></>}
      </Nav>
      {props.children}
    </div>
  )
}
export default Layout;
