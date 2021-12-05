/** https://material.io/components/buttons/web */
import './index.scss';

import clsx from 'clsx';
import { useRipple } from 'components/hooks';
import React, { createElement, FC } from 'react';

type ButtonIconProps = {
  icon: string | FC<any>;
};

const ButtonIcon = ({ icon }: ButtonIconProps): JSX.Element => {
  const iconProps = {
    className: clsx({
      'material-icons': true,
      'mdc-button__icon': true,
    }),
    'aria-hidden': true,
  };
  if (typeof icon === 'string') {
    return <span {...iconProps}>{icon}</span>;
  }
  return createElement(icon, iconProps);
};

type ButtonProps = {
  label: string;
  icon?: string | FC<any>;
  isDisabled?: boolean;
  isFullwidth?: boolean;
  isIconLeading?: boolean;
  isRaised?: boolean;
  type?: 'text' | 'outlined' | 'contained';
};

export const Button = ({
  label,
  icon,
  isDisabled = false,
  isFullwidth = false,
  isIconLeading = true,
  isRaised = true,
  type = 'text',
}: ButtonProps): JSX.Element => {
  const ref = useRipple();
  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={clsx({
        'custom-button--fullwidth': type !== 'text' && isFullwidth,
        'mdc-button': true,
        'mdc-button--icon-leading': icon && isIconLeading,
        'mdc-button--icon-trailing': icon && !isIconLeading,
        'mdc-button--outlined': type === 'outlined',
        'mdc-button--raised': type === 'contained' && isRaised,
        'mdc-button--touch': true,
        'mdc-button--unelevated': type === 'contained' && !isRaised,
      })}
    >
      <span className="mdc-button__ripple" />
      <span className="mdc-button__touch" />
      {icon && isIconLeading && <ButtonIcon icon={icon} />}
      <span className="mdc-button__label">{label}</span>
      {icon && !isIconLeading && <ButtonIcon icon={icon} />}
    </button>
  );
};
