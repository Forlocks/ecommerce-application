import React from 'react';
import { IInputProps } from '../InputBase/IInputBase';
import { Input } from '../InputBase/InputBase';

interface EmailInputProps extends IInputProps {}

const EmailInput: React.FC<EmailInputProps> = (props) => <Input {...props} type="email" />;

export { EmailInput };
