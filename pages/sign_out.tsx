import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {useEffect} from 'react';
import {withSession} from '../lib/session';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Router from 'next/router';

const Tip = styled.div`
  font-size: 28px;
  color: #FFFFD2;
`;

const SignOut: NextPage = () => {
  useEffect(() => {
    setTimeout(() => {
      Router.push('/');
    }, 3000);
  },[])
  return (
    <Layout>
      <Tip>已登出~~~自动跳转回首页</Tip>
    </Layout>
  )
};

export default SignOut;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  // @ts-ignore
  context.req.session.unset('currentUser');
  // @ts-ignore
  context.req.session.destroy();
  return {
    props: {

    }
  };
});