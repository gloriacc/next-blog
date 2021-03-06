import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../hooks/useForm';
import Layout from '../components/Layout';

const SignUp: NextPage = () => {
  const {form} = useForm({
    initFormData: {username: '', password: '', passwordConfirmation: ''},
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
    ],
    buttons: <button type="submit">SIGN UP</button>,
    submit: {
      request: formData => axios.post('/api/v1/users', formData),
      success: () => {
        alert('注册成功');
        location.href = '/sign_in';
      }
    }
  });
  return (
    <Layout>
      {form}
    </Layout>
  )
};

export default SignUp;