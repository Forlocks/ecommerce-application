import { InputProps } from '../InputBase/IInputBase';

interface PasswordInputProps extends InputProps {
	showPassword: boolean;
	togglePasswordVisibility: () => void;
}

export { PasswordInputProps };
