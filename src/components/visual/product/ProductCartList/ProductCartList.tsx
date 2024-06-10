import React, { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCartCard } from '../ProductCartCard/ProductCartCard';
import { getProducts } from '../../../../controllers/api/Products';

export const ProductCartList = () => {
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
    <div className="product-cart-list">
      {products.map((product) => (
        <ProductCartCard
          className="cart"
          key={product.id}
          product={product}
          onButtonClick={() => console.log(`Button click on shop card ${product.id}`)}
        />
      ))}
    </div>
  );
};
