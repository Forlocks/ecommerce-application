import React, { useState, useEffect } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { ProductCartCard } from '../ProductCartCard/ProductCartCard';
import { cartRemoveLineItem, getCart } from '../../../../controllers/api/Cart';
import { IProductCartList } from './IProductCartList';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';

export const ProductCartList: React.FC<IProductCartList> = ({
  updateTotalPrice,
  openModal,
  closeModal,
}) => {
  const [cart, setCart] = useState<LineItem[]>([]);

  const fetchProducts = async () => {
    try {
      const cartArr = await getCart();
      setCart(cartArr[cartArr.length - 1].lineItems);
      updateTotalPrice();
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  };

  const cleanCart = async () => {
    if (closeModal) {
      closeModal();
    }
    await cart.reduce(async (promise, cartItem) => {
      await promise;
      return cartRemoveLineItem(cartItem.id);
    }, Promise.resolve());
    fetchProducts();
  };

  const handleButtonCleanClick = () => {
    openModal(
      <div className="accept-modal">
        <p>Are you sure you want to remove all items from your cart?</p>
        <LargeButton onClick={cleanCart}>YES</LargeButton>
      </div>,
    );
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
      {cart.length !== 0 && (
        <LargeButton onClick={handleButtonCleanClick}>Clean the cart</LargeButton>
      )}
    </div>
  );
};
