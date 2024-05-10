import { IInputProps } from '../InputBase/IInputBase';

interface IPasswordInputProps extends IInputProps {
	showPassword: boolean;
	togglePasswordVisibility: () => void;
}

export { IPasswordInputProps };
