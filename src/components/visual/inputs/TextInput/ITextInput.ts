import { IInputBase } from '../InputBase/IInputBase';

export interface ITextInput extends IInputBase {
  onEdit?: () => void;
}
