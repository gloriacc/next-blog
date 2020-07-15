import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import Link from 'next/link';
import {withSession} from '../lib/session';
import {User} from '../src/entity/User';

type Props = {
  posts: Post[],
  user: User
}

const index: NextPage<Props> = (props) => {
  const {posts, user} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post => <Link key={post.id} href={`/posts/${post.id}`}><a>{post.title}</a></Link>)}
      {user?<Link href={'/sign_out'}><a>退出</a></Link>:<div><Link href={'/sign_in'}><a>登录</a></Link><Link href={'/sign_up'}><a>注册</a></Link></div>}
    </div>
  )
}

export default index;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  console.log(posts);
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  // @ts-ignore
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      user: user ? JSON.parse(JSON.stringify(user)) : null
    }
  };
});
