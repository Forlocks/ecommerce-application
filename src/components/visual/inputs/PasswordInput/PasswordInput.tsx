import React from 'react';
import { Input } from '../InputBase/InputBase';
import { IPasswordInputProps } from './IPasswordInput';

const PasswordInput: React.FC<IPasswordInputProps> = ({
	showPassword,
	togglePasswordVisibility,
	...props
}) => (
	<div style={{ position: 'relative' }}>
		<Input {...props} type={showPassword ? 'text' : 'password'} />
		<button
			onClick={togglePasswordVisibility}
			type="button"
			style={{ position: 'absolute', right: 0, top: 0 }}
		>
			{showPassword ? 'hide' : 'show'}
		</button>
	</div>
);

export { PasswordInput };
