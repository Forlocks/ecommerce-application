import React from 'react';
import { InputProps } from '../InputBase/inputBaseInterface';
import { Input } from '../InputBase/InputBase';

interface EmailInputProps extends InputProps {}

const EmailInput: React.FC<EmailInputProps> = (props) => <Input {...props} type="email" />;

export { EmailInput };
