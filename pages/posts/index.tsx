import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import Link from 'next/link';
import {withSession} from '../../lib/session';
import {User} from '../../src/entity/User';
import styled from 'styled-components';
import axios from 'axios';

type Props = {
  posts: Post[],
  user: User
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 48px;
  > section {
    > div {
    margin: 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > a {
        display: flex;
        justify-content: space-between;
        color: black;
        text-decoration: none;
        :hover {
          color: gray;
        }
        :first-child {
          flex-grow: 1;
        }
      }
    }
  }
`;

const PostsIndex: NextPage<Props> = (props) => {
  const {posts, user} = props;
  const onDelete = useCallback((id: number)=>{
    console.log(id);
    axios.delete(`/api/v1/postDelete`, {params: {id}}).then(()=>{
      alert('删除成功');
      location.href = '/posts';
    },error => {
      console.log(error);
    })
  }, [posts]);
  const onVisibleToggle = useCallback((id: number)=>{},[]);
  return (
    <Wrapper>
      <section>
        {posts.map(post => {
          return <div key={post.id}>
            <Link href={`/posts/${post.id}`}><a><span>{post.title}</span><span>{post.createdAt}</span></a></Link>
            {user.username === 'admin' && <><Link href={`/posts/new/${post.id}`}><a>编辑</a></Link><a onClick={()=>onDelete(post.id)}>删除</a><a onClick={()=>onVisibleToggle(post.id)}>隐藏</a></>}
          </div>})
        }
      </section>
    </Wrapper>
  )
}

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});