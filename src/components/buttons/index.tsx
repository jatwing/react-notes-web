import React from 'react';
import './index.scss';

type ButtonProps = {
  label: string;
}



export const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button className="mdc-button mdc-button--touch">
      <span className="mdc-button__ripple"></span>
      <span className="mdc-button__touch"></span>
      <span className="mdc-button__label">{props.label}</span>
    </button>
  );
};
