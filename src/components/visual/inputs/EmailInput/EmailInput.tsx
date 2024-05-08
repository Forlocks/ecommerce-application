import { InputProps } from '../InputBase/inputBaseInterface';
import { Input } from '../InputBase/InputBase';
import React from 'react';

interface EmailInputProps extends InputProps {}

const EmailInput: React.FC<EmailInputProps> = (props) => {
  return <Input {...props} type="email" />;
}

export {EmailInput};