import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IBasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
