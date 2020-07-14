import React from "react";
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';

type Props = {
  browser: {
    name: string;
    version: string;
    major: string;
  }
}

const index: NextPage<Props> = (props) => {
  const {browser} = props;
  return (
    <div>
      <h1>{browser.name}</h1>
    </div>
  )
}

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection();
  console.log('connect');
  return {
    props: {
      browser: {
        name: 'chrome'
      }
    }
  };

};
