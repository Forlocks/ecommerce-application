import { ChangeEvent } from 'react';

export interface IEmailAndPasswordFieldsProps {
  email: string;
  emailError: string;
  onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  passwordError: string;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  emailDisabled?: boolean;
  passwordDisabled?: boolean;
  passwordPlaceholder?: string;
  editMode?: boolean;
  onEditEmail?: () => void;
  onEditPassword?: () => void;
  onOldPasswordChange?: () => void;
  onNewPasswordChange?: () => void;
  newPasswordError?: string;
}
