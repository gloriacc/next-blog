import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import {withSession} from '../../lib/session';
import Layout from '../../components/Layout';
import {Post} from '../../src/entity/Post';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';

type Props = {
  post: Post
};

const PostsNew: NextPage<Props> = (props) => {
  const {post} = props;
  const {form} = useForm({
    initFormData: post ? {title: post.title, content: post.content, id: post.id} : {title: '', content: ''},
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    buttons: <button type="submit">DONE</button>,
    submit: {
      request: formData => post ? axios.put('/api/v1/posts', formData) : axios.post('/api/v1/posts', formData),
      success: () => {
        alert('提交成功');
        location.href = '/posts';
      }
    }
  });
  return (
    <Layout>
      {form}
    </Layout>
  )
};

export default PostsNew;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  const connection = await getDatabaseConnection();
  // @ts-ignore
  const post = context.query.id ? await connection.manager.findOne(Post, context.query.id) : null;
  return {
    props: {
      // user: JSON.parse(JSON.stringify(user || '')),
      post: JSON.parse(JSON.stringify(post))
    }
  };
});