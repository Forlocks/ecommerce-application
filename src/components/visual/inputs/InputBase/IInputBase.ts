import { ChangeEvent } from 'react';

export interface IInputBase {
  id?: string;
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
