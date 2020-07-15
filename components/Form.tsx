import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react';

type Props = {
  fields: {
    label: string,
    type: 'text' | 'password' | 'textarea',
    value: string | number,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    errors: string[]
  }[],
  onSubmit: FormEventHandler,
  buttons: ReactChild
};
const Form: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      {props.fields.map(field =>
        <div>
          <label>{field.label}
            {field.type === 'textarea' ?
              <textarea onChange={field.onChange}>{field.value}</textarea>
              :
              <input type={field.type} value={field.value} onChange={field.onChange}/>
            }
          </label>
          {field.errors?.length > 0 && <div>{field.errors.join(',')}</div>}
        </div>
      )}
      <div>{props.buttons}</div>
    </form>
  )
};
export default Form;