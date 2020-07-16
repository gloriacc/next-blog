import {NextPage} from 'next';
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {useForm} from '../../hooks/useForm';

const PostsNew: NextPage = () => {
  const initFormData = {title: '', content: ''};
  const onSubmit = (formData: typeof initFormData) => {
    axios.post('/api/v1/posts', formData).then(()=>{
      alert('提交成功');
    },(error) => {
      if (error.response) {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          setErrors(response.data);
        }
      }
    });
  };
  const {form, setErrors} = useForm({
    initFormData,
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    buttons: <button type="submit">提交</button>,
    onSubmit
  });
  return (
    <div>
      {form}
    </div>
  )
};

export default PostsNew;