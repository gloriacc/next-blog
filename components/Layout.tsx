import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import logo from '../assets/images/logo.png';
import Link from 'next/link';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  > a {
    margin: 24px 0;
    > img {
      width: 200px;
    }
  }
`;

const Layout = (props: any) => {
  return (
    <Wrapper>
      <Link href={'/'}><a><img src={logo} alt="logo"/></a></Link>
      {props.children}
    </Wrapper>
  )
}
export default Layout;
