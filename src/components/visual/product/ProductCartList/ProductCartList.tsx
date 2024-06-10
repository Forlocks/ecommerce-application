import React, { useState, useEffect } from 'react';

import { LineItem } from '@commercetools/platform-sdk';
import { ProductCartCard } from '../ProductCartCard/ProductCartCard';
import { getCart } from '../../../../controllers/api/Cart';

export const ProductCartList = () => {
  const [cart, setCart] = useState<LineItem[]>([]);

  const fetchProducts = async () => {
    try {
      const cartArr = await getCart();
      setCart(cartArr[cartArr.length - 1].lineItems);
      console.log(444);
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-cart-list">
      {cart.map((product) => (
        <ProductCartCard
          className="cart"
          key={product.id}
          product={product}
          onButtonClick={() => console.log(`Button click on shop card ${product.id}`)}
          onRemove={fetchProducts}
        />
      ))}
    </div>
  );
};
