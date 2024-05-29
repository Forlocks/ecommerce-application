import React from 'react';
import { IProductImageProps } from './IProductImageProps';

export const ProductImage: React.FC<IProductImageProps> = ({ url, alt }) => (
  <img src={url} alt={alt} />
);
