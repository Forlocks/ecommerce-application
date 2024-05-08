import { ChangeEvent } from 'react';

interface InputProps {
	label?: string;
	type?: string;
	error?: string;
	placeholder?: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	name: string;
}

export { InputProps };
