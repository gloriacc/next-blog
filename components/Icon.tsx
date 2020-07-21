import React from 'react';
import classNames from 'classnames';

type Props = {
  name: string
} & React.SVGAttributes<HTMLOrSVGElement>;

const Icon = (props: Props) => {
  const {name, children, className, ...rest} = props;
  return (
    <svg className={classNames('icon', className)} {...rest}>
      <use xlinkHref={'#' + props.name}/>
    </svg>
  )
}
export default Icon;