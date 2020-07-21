import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import Link from 'next/link';
import {withSession} from '../lib/session';
import {User} from '../src/entity/User';
import styled from 'styled-components';
// @ts-ignore
import logo from '../assets/images/logo.png';
import Icon from '../components/Icon';
import '../assets/icons/sign.svg';
import classNames from 'classnames';

type Props = {
  posts: Post[],
  user: User
}

const HomeTitle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  > img {
   width: 500px;
  }
  > p {
    font-size: 28px;
    color: #FFFFD2;
  }
  > a {
    color: #FCBAD3;
    text-decoration: none;
  }
  @media screen and (max-width:650px){
   > img {
     width: 70%;
    }
  }
`;

const Sign = styled.div`
  .sign {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0;
    width: 40px;
    height: 40px;
  }
  .sign-signIn {
    fill: #FFFFD2;
  }
  .sign-signOut {
    fill: #FCBAD3;
  }
`;

const Home: NextPage<Props> = (props) => {
  const {user} = props;
  const onClick = () => {
    location.href = user ? '/sign_out' : 'sign_in';
  }
  return (
    <>
      <HomeTitle className='big'>
        <img src={logo} alt="logo"/>
        <p>Gloria 的个人博客</p>
        <Link href={'/posts'}><a>{`文章列表->`}</a></Link>
      </HomeTitle>
      <Sign>
        <Icon className={classNames('sign', user?'sign-signOut':'sign-signIn')} name="sign" onClick={onClick}/>
      </Sign>
    </>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts.slice(0, 4))),
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});
