import React from 'react';
import { IProductStyleProps } from './IProductStyle';

export const ProductStyle: React.FC<IProductStyleProps> = ({ style }) => (
  <div className="product-style">
    <p>Style:</p> {style}
  </div>
);
