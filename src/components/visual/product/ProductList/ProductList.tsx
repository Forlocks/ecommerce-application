import React, { useEffect, useState } from 'react';
import '../product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProducts } from '../../../../controllers/api/Products';
import { ProductCard } from '../ProductCard/ProductCard';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productArr = await getProducts();
        setProducts(productArr);
        console.log(productArr);
      } catch (error) {
        console.error('Error:', (error as Error).message);
      }
    }

    fetchProducts();
  }, []);

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
