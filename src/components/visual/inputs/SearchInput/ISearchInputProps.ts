import { IInputBase } from '../InputBase/IInputBase';

export interface ISearchInputProps extends IInputBase {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
