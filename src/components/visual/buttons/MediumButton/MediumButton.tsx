import React, { FC } from 'react';
import { IMediumButtonProps } from './IMediumButton';
import { BasicButton } from '../BasicButton/BasicButton';

export const MediumButton: FC<IMediumButtonProps> = ({
  children,
  disabled,
  disabledText,
  ...props
}) => (
  <BasicButton {...props} disabled={disabled} className="button button--medium">
    <div className="button__content">{disabled ? disabledText : children}</div>
  </BasicButton>
);
