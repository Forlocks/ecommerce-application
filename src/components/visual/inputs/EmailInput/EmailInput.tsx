import React from 'react';
import { IInputBase } from '../InputBase/IInputBase';
import { InputBase } from '../InputBase/InputBase';

export const EmailInput: React.FC<IInputBase> = function (props) {
  return <InputBase {...props} type="email" />;
};
