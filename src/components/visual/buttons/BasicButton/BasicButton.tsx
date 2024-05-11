import React, { FC } from 'react';
import { IBasicButtonProps } from './IBasicButton';

export const BasicButton: FC<IBasicButtonProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
