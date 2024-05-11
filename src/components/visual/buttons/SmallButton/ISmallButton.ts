import { ReactNode } from 'react';
import { IBasicButtonProps } from '../BasicButton/IBasicButton';

export interface ISmallButtonProps extends IBasicButtonProps {
  icon: ReactNode;
}
