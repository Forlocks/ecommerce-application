import React from 'react';
import { InputProps } from '../InputBase/inputBaseInterface';
import { Input } from '../InputBase/InputBase';

interface PasswordInputProps extends InputProps {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => <Input {...props} type="password" />;

export { PasswordInput };
