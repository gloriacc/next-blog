import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import {withSession} from '../../lib/session';

const PostsNew: NextPage = () => {
  const {form,} = useForm({
    initFormData: {title: '', content: ''},
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    buttons: <button type="submit">DONE</button>,
    submit: {
      request: formData => axios.post('/api/v1/posts', formData),
      success: () => {
        alert('提交成功');
        location.href = '/posts';
      }
    }
  });
  return (
    <div>
      {form}
    </div>
  )
};

export default PostsNew;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});