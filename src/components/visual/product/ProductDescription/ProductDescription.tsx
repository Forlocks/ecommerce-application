import React from 'react';
import { IProductDescriptionProps } from './IProductDescriptionProps';

export const ProductDescription: React.FC<IProductDescriptionProps> = ({ description }) => (
  <p>{description}</p>
);
