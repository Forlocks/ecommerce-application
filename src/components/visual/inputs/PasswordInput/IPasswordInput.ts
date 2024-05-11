import { IInputBase } from '../InputBase/IInputBase';

export interface IPasswordInput extends IInputBase {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}
