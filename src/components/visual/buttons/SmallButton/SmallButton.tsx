import React, { FC } from 'react';
import { BasicButton } from '../BasicButton/BasicButton';
import { ISmallButtonProps } from './ISmallButton';

export const SmallButton: FC<ISmallButtonProps> = ({ icon, children, ...props }) => (
  <BasicButton {...props} className="button button--small">
    <div className="button__content">
      {icon}
      {children}
    </div>
  </BasicButton>
);
