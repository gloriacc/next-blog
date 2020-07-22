import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import Link from 'next/link';
import {withSession} from '../../lib/session';
import {User} from '../../src/entity/User';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';
import Icon from '../../components/Icon';
import '../../assets/icons/add.svg';
import '../../assets/icons/edit.svg';
import '../../assets/icons/delete.svg';
import '../../assets/icons/hide.svg';
import '../../assets/icons/show.svg';
import Layout from '../../components/Layout';

type Props = {
  posts: Post[],
  user: User
}

const Wrapper = styled.main`
  max-width: 90%;
  > div {
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #FCBAD3;
    a {
      color: #FFFFD2;
      text-decoration: none;
      cursor: pointer;
      :hover {
        color: #FCBAD3;
      }
    }
    > a, > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > a {
        margin-left: 20px;
        
      }
      .icon {
        width: 20px;
        height: 20px;
        fill: #FFFFD2;
        vertical-align: bottom;
        :hover {
          fill: #FCBAD3;
        }
      }
    }
    > a {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      max-width: 70%;
    }
    > span {
      color: #FFFFD2;
      margin-left: 20px;
    }
  }
  @media screen and (max-width:650px){
    > div {
      flex-direction: column;
      line-height: 28px;
      > a {
        white-space: normal;
        text-align: center;
      }
      > span {
        margin-left: 0;
      }
      > div {
        > a:first-child {
          margin-left: 0;
        }
      }
    }
  }
`;

const AddButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  > .add {
    width: 20px;
    height: 20px;
    fill: #FFFFD2;
  }
`;

const PostsIndex: NextPage<Props> = (props) => {
  const {posts, user} = props;
  const onAdd = useCallback(()=>{
    location.href = '/posts/new';
  },[]);
  const onDelete = useCallback((id: number)=>{
    axios.delete(`/api/v1/postDelete`, {params: {id}}).then(()=>{
      alert('删除成功');
      location.href = '/posts';
    },error => {
      console.log(error);
    })
  }, []);
  const onVisibleToggle = useCallback((id: number)=>{
    axios.put(`/api/v1/postPrivate`, {id}).then(()=>{
      alert('切换成功');
      location.href = '/posts';
    },error => {
      console.log(error);
    })
  },[]);
  return (
    <Layout>
      <Wrapper>
        {posts.map(post => {
          return <div key={post.id}>
            <Link href={`/posts/${post.id}`}><a>{post.title}</a></Link>
            <span>{dayjs(post.updatedAt).format('YYYY.MM.DD')}</span>
            {user.username === 'admin' && <div><Link href={`/posts/new/${post.id}`}><a><Icon name="edit"/></a></Link><a onClick={()=>onDelete(post.id)}><Icon className="delete" name="delete"/></a><a onClick={()=>onVisibleToggle(post.id)}><Icon name={post.isPrivate ? 'hide' : 'show'}/></a></div>}
          </div>})
        }
      </Wrapper>
      {user.username === 'admin' && <AddButton><Icon className="add" name="add" onClick={onAdd}/></AddButton>}
    </Layout>
  )
}

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  const filter = (!user || user.username !== 'admin') && { isPrivate: false };
  const posts = await connection.manager.find(Post, filter);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});