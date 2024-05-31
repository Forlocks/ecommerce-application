import React from 'react';
import { IProductMaterialProps } from './IProductMaterial';

export const ProductMaterial: React.FC<IProductMaterialProps> = ({ material }) => (
  <div className="product-material">
    <h4>Material:</h4> <h5>{material}</h5>
  </div>
);
