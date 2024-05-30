import React from 'react';
import { IProductMaterialProps } from './IProductMaterial';

export const ProductMaterial: React.FC<IProductMaterialProps> = ({ material }) => (
  <div className="product-material">
    <p>Material:</p> {material}
  </div>
);
