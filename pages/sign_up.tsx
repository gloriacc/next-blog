import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../hooks/useForm';

const SignUp: NextPage = () => {
  const {form} = useForm({
    initFormData: {username: '', password: '', passwordConfirmation: ''},
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
    ],
    buttons: <button type="submit">注册</button>,
    submit: {
      request: formData => axios.post('/api/v1/users', formData),
      success: () => {
        alert('注册成功');
        location.href = '/sign_in';
      }
    }
  });
  return (
    <div>
      <h1>注册</h1>
      {form}
    </div>
  )
};

export default SignUp;