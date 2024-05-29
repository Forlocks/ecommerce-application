import { IInputBase } from '../InputBase/IInputBase';

export interface INumberInputProps extends IInputBase {
  min?: number;
  max?: number;
  step?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
