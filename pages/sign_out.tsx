import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import {withSession} from '../lib/session';

const SignOut: NextPage = () => {
  return (
    <>
      <h1>已登出</h1>
    </>
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