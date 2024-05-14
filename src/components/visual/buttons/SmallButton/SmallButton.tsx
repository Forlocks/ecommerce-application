import React, { FC } from 'react';
import { BasicButton } from '../BasicButton/BasicButton';
import { ISmallButtonProps } from './ISmallButton';

export const SmallButton: FC<ISmallButtonProps> = ({ icon, children, ...props }) => (
  <BasicButton type="button" {...props} className="button button--small">
    <div className="button__content">
      {icon}
      {children}
    </div>
  </BasicButton>
);
