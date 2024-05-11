import React, { FC } from 'react';
import { IMediumButtonProps } from './IMediumButton';
import { BasicButton } from '../BasicButton/BasicButton';

export const MediumButton: FC<IMediumButtonProps> = ({ children, ...props }) => (
  <BasicButton {...props} className="button button--medium">
    <div className="button__content">{children}</div>
  </BasicButton>
);
