import React from 'react';
import { IProductStyleProps } from './IProductStyle';

export const ProductStyle: React.FC<IProductStyleProps> = ({ style }) => (
  <div className="product-style">
    <h4>Style:</h4> <h5>{style}</h5>
  </div>
);
