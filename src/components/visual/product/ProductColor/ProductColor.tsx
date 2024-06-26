import React from 'react';
import { IProductColorProps } from './IProductColor';

export const ProductColor: React.FC<IProductColorProps> = ({ color }) => (
  <div className="product-color">
    <h4>Color:</h4> <h5>{color}</h5>
  </div>
);
