import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import Link from 'next/link';
import {withSession} from '../../lib/session';
import {User} from '../../src/entity/User';

type Props = {
  posts: Post[],
  user: User
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post => <Link key={post.id} href={`/posts/${post.id}`}><a>{post.title}</a></Link>)}
    </div>
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