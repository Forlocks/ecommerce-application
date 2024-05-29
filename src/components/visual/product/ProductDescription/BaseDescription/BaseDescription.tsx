import React from 'react';
import { IBaseDescriptionProps } from './IBaseDescriptionProps';

export const BaseDescription: React.FC<IBaseDescriptionProps> = ({ description }) => (
  <p>{description}</p>
);
