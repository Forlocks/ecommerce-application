import React, { useEffect, useState } from 'react';
import '../product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { searchProduct } from '../../../../controllers/api/Products';
import { ProductCard } from '../ProductCard/ProductCard';
import { IProductList } from './IProductList';

export const ProductList: React.FC<IProductList> = ({ selectedColors }) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const colorStr =
        selectedColors.length !== 0
          ? selectedColors.map((color: string) => `"${color}"`)
          : ['exists'];
      const result = await searchProduct(
        `variants.attributes.attribute-colour-03:${[...colorStr]}`,
      );
      setProducts(result);
    };

    fetchFilteredProducts();
  }, [selectedColors]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          className="shop"
          key={product.id}
          product={product}
          onButtonClick={() => console.log(`Button click on shop card ${product.id}`)}
        />
      ))}
    </div>
  );
};
