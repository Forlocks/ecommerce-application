import { ReactNode } from 'react';

export interface IBasicButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}
