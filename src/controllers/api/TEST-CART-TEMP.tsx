import React from 'react';
import { cartAddLineItem, createCart, getCart } from './Cart';

export const TestCartFunctions = () => {
  return (
    <>
      <button
        onClick={async () => {
          const test = await createCart();
          console.log(test);
        }}
        style={{ cursor: 'pointer' }}
      >
        CREATE CART
      </button>
      <button
        onClick={async () => {
          const test = await getCart();
          console.log(test);
        }}
        style={{ cursor: 'pointer' }}
      >
        GET CART
      </button>
      <button
        onClick={async () => {
          const test = await cartAddLineItem('36fb5424-49f4-432b-86d9-fb6161269723');
          console.log(test);
        }}
        style={{ cursor: 'pointer' }}
      >
        cartAddLineItem
      </button>
    </>
  );
};
