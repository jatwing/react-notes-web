/** https://material.io/components/buttons/web */
import React, { useRef, useEffect, createElement } from 'react';
import './index.scss';
import { MDCRipple } from '@material/ripple';
import clsx from 'clsx';

// test using svg icon
import { TestIcon } from 'components/svg-icons';

type ButtonProps = {
  label: string;
  icon?: string | JSX.Element;
  isIconLeading?: boolean;
  type?: 'text' | 'outlined' | 'contained';
};

export const Button = ({
  label,
  icon,
  isIconLeading = true,
  type = 'text',
}: ButtonProps): JSX.Element => {
  // maybe create a useRipple hook;
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      MDCRipple.attachTo(ref.current);
    }
  }, [ref]);
  let iconElement;
  if (!icon) {
    iconElement = null;
  } else if (typeof icon === 'string') {
    iconElement = (
      <span
        className={clsx({
          'material-icons': true,
          'mdc-button__icon': true,
        })}
        aria-hidden="true"
      />
    );
  } else {
    iconElement = createElement(TestIcon, {
      className: clsx({
        'material-icons': true,
        'mdc-button__icon': true,
      }),
      'aria-hidden': 'true',
    });
  }

  return (
    <button
      ref={ref}
      className={clsx({
        'mdc-button': true,
        'mdc-button--touch': true,
      })}
    >
      <span className="mdc-button__ripple" />
      <span className="mdc-button__touch" />

      {icon && isIconLeading && 
      // still wrong, need to add extra className for leading
      iconElement}

      {false && (
        <span
          className={clsx({
            'material-icons': true,
            'mdc-button__icon': true,
          })}
          aria-hidden="true"
        >
          bookmark
        </span>
      )}
      <span className="mdc-button__label">{label}</span>
    </button>
  );
};
