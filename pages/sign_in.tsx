import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {withSession} from '../lib/session';
import {User} from '../src/entity/User';
import {useForm} from '../hooks/useForm';
import qs from 'query-string';
import Layout from '../components/Layout';

const SignIn: NextPage<{user: User}> = (props) => {
  const {form} = useForm({
    initFormData: {username: '', password: ''},
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ],
    buttons: <button type="submit">SIGN IN</button>,
    submit: {
      request: formData => axios.post('/api/v1/sessions', formData),
      success: () => {
        alert('登录成功');
        location.href = '/posts';
        // const query = qs.parse(location.search);
        // location.href = query.returnTo.toString();
      }
    }
  });
  return (
    <Layout>
      {form}
    </Layout>
  )
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});