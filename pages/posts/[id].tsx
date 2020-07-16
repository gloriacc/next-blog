import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import React from 'react';
import {withSession} from '../../lib/session';
import {User} from '../../src/entity/User';

type Props = {
  post: Post,
  user: User
};

const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.content}}>

      </article>
    </div>
  )
};
export default postsShow;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  // @ts-ignore
  const post = await connection.manager.findOne(Post, context.params.id);
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});