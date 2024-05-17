import React from 'react';
import { IInputBase } from '../InputBase/IInputBase';
import { InputBase } from '../InputBase/InputBase';

export const TextInput: React.FC<IInputBase> = function (props) {
  return <InputBase {...props} type="text" />;
};
