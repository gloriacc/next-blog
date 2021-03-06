import React, {ReactChild, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding: 24px 48px;
  width: 80%;
  > div {
    margin: 12px 16px;
    width: 100%;
    > label {
      > input,textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 6px 8px;
        border: none;
        outline: none;
        font-size: 16px;
      }
      > input {
        height: 50px;
      }
      > textarea {
        height: 600px;
        resize: none;
      }
    }
    > button {
      width: 100%;
      box-sizing: border-box;
      border: none;
      padding: 12px 8px;
      margin: 12px 0 0;
      background: #FCBAD3;
      color: #FFFFD2;
      outline: none;
      font-size: 18px;
      line-height: 18px;
      border-radius: 10px;
    }
  }
`;

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
    success: () => void;
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
    submit.request(formData).then(
      submit.success,
      (error) => {
      if (error.response) {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          setErrors(response.data);
        }
      }
    });
  }, [submit, formData]);
  const form = (
    <FormWrapper onSubmit={onSubmit}>
      {fields.map(field =>
        <div key={field.key.toString()}>
          <label>
            {/*<span>{field.label}</span>*/}
            {field.type === 'textarea' ?
              <textarea onChange={e => onChange(field.key, e.target.value)} value={formData[field.key].toString()} placeholder={field.label}/>
              :
              <input type={field.type} value={formData[field.key].toString()} onChange={e => onChange(field.key, e.target.value)} placeholder={field.label}/>
            }
          </label>
          {errors[field.key]?.length > 0 && <div>{errors[field.key].join(',')}</div>}
        </div>
      )}
      <div>{buttons}</div>
    </FormWrapper>
  );
  return {
    form: form
  };
}