import { IInputBase } from '../InputBase/IInputBase';

export interface IListInput extends IInputBase {
  id?: string;
  options: string[];
}
