import React, {ReactChild, useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {Simulate} from 'react-dom/test-utils';

type Field<T> = {
  label: string;
  type: 'text' | 'password' | 'textarea';
  key: keyof T;
};

type UseFormOptions<T> = {
  initFormData:T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (fd: T) => Promise<AxiosResponse<T>>;
    message: string;
  }
}

export function useForm<T>(options: UseFormOptions<T>) {
  const {initFormData, fields, buttons, submit} = options;
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  })
  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value});
  }, [formData]);
  const onSubmit = useCallback(e => {
    e.preventDefault();
    submit.request(formData).then(() => {
      alert(submit.message);
    },(error) => {
      if (error.response) {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          setErrors(response.data);
        }
      }
    });
  }, [submit, formData]);
  const form = (
    <form onSubmit={onSubmit}>
      {fields.map(field =>
        <div key={field.key.toString()}>
          <label>{field.label}
            {field.type === 'textarea' ?
              <textarea onChange={e => onChange(field.key, e.target.value)} value={formData[field.key].toString()}/>
              :
              <input type={field.type} value={formData[field.key].toString()} onChange={e => onChange(field.key, e.target.value)}/>
            }
          </label>
          {errors[field.key]?.length > 0 && <div>{errors[field.key].join(',')}</div>}
        </div>
      )}
      <div>{buttons}</div>
    </form>
  );
  return {
    form: form
  };
}