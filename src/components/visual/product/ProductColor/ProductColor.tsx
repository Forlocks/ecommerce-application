import React from 'react';
import { IProductColorProps } from './IProductColor';

export const ProductColor: React.FC<IProductColorProps> = ({ color }) => (
  <div className="product-color">
    <p>Color:</p> {color}
  </div>
);
