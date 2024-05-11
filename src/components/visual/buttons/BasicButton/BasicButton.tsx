import React, { FC } from 'react';
import { IBasicButtonProps } from './IBasicButton';

export const BasicButton: FC<IBasicButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);
