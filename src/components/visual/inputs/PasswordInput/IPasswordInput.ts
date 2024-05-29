import { IInputBase } from '../InputBase/IInputBase';

export interface IPasswordInput extends IInputBase {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  oldPassword?: string;
  newPassword?: string;
  onOldPasswordChange?: () => void;
  onNewPasswordChange?: () => void;
  newPasswordError?: string;
  showNewPassword?: boolean;
  toggleNewPasswordVisibility?: () => void;
}
