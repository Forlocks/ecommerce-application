import React from 'react';
import { ILogoProps } from './Ilogo';

export const Logo: React.FC<ILogoProps> = ({ className }) => (
  <div className={className}>
    <div>Chic</div>
    <div>&</div>
    <div>Vessel</div>
  </div>
);
