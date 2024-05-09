import { InputProps } from '../InputBase/inputBaseInterface';

interface PasswordInputProps extends InputProps {
	showPassword: boolean;
	togglePasswordVisibility: () => void;
}

export { PasswordInputProps };
