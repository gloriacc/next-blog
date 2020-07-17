import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import Link from 'next/link';
import {withSession} from '../lib/session';
import {User} from '../src/entity/User';
import styled from 'styled-components';

type Props = {
  posts: Post[],
  user: User
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

const HomeTitle = styled.section`
  height: 280px;
  line-height: 280px;
  font-size: 88px;
  text-align: center;
  border-bottom: 1px solid gray;
`;

const HomeList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 48px;
  > a {
    width: 500px;
    height: 200px;
    border: 1px solid gray;
    margin: 12px 16px;
  } 
  > button {
    width: 500px;
    border: 1px solid gray;
    padding: 12px 0;
    margin: 12px 0 0;
    background: none;
    outline: none;
    font-size: 18px;
  }
`;

const Home: NextPage<Props> = (props) => {
  const {posts} = props;
  const onClick = useCallback(() => {
    location.href = '/posts';
  },[]);
  return (
    <Wrapper>
      <HomeTitle className='big'>Gloria</HomeTitle>
      <HomeList>
        {posts.map(post => <Link key={post.id} href={`/posts/${post.id}`}><a>{post.title}{post.createdAt}</a></Link>)}
        <button onClick={onClick}>More</button>
      </HomeList>
    </Wrapper>
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
