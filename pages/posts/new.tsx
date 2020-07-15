import {NextPage} from 'next';
import Form from '../../components/Form';
import React, {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const PostsNew: NextPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const [errors, setErrors] = useState({
    title: [],
    content: []
  })
  const onSubmit = useCallback(e => {
    e.preventDefault();
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
  }, [formData]);

  const onChange = useCallback((key, value) => {
    setFormData({
      ...formData, [key]:value
    })
  }, [formData]);
  return (
    <div>
      <Form
        fields={[
          {label: '标题', type: 'text', value: formData.title, onChange: e => onChange('title', e.target.value), errors: errors.title},
          {label: '内容', type: 'textarea', value: formData.content, onChange: e => onChange('content', e.target.value), errors: errors.content}
        ]}
        onSubmit={onSubmit}
        buttons={<button type="submit">提交</button>}
      />
    </div>
  )
};

export default PostsNew;