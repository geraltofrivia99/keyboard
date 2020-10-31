import React from 'react';
import './styles.css';

interface IProps {
  button: string;
}

export const Button = React.memo(({ button }: IProps): React.ReactElement => {
  return (
    <button data-type="keyboard-btn" id={button} className="btn">{button}</button>
  )
})