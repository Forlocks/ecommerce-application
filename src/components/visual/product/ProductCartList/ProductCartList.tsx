import React, { useState, useEffect } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { NavLink } from 'react-router-dom';
import { ProductCartCard } from '../ProductCartCard/ProductCartCard';
import { cartRemoveLineItem, getCart } from '../../../../controllers/api/Cart';
import { IProductCartList } from './IProductCartList';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';

export const ProductCartList: React.FC<IProductCartList> = ({
  updateTotalPrice,
  openModal,
  closeModal,
  updateCartItemsQuantity,
}) => {
  const [cart, setCart] = useState<LineItem[]>([]);

  const fetchProducts = async () => {
    try {
      const cartArr = await getCart();
      if (cartArr.length) {
        setCart(cartArr[cartArr.length - 1].lineItems);
        updateTotalPrice();
        const totalQuantity = cartArr[cartArr.length - 1].lineItems.reduce(
          (acc, item) => acc + item.quantity,
          0,
        );
        updateCartItemsQuantity(totalQuantity);
      } else {
        setCart([]);
        updateCartItemsQuantity(0);
      }
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
    await fetchProducts();
  };

  const handleButtonCleanClick = () => {
    openModal(
      <div className="accept-modal">
        <h3>Clean the cart?</h3>
        <span>Are you sure you want to remove all items from your cart?</span>
        <LargeButton onClick={cleanCart}>YES</LargeButton>
      </div>,
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-cart-list">
      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <h3>
            Cart is empty. You can fill it <NavLink to="/shop">here</NavLink>
          </h3>
        </div>
      ) : (
        <>
          {cart.map((product) => (
            <ProductCartCard
              className="cart"
              key={product.id}
              product={product}
              onButtonClick={() => console.log(`Button click on shop card ${product.id}`)}
              onRemove={fetchProducts}
            />
          ))}
          <MediumButton onClick={handleButtonCleanClick}>Clean the cart</MediumButton>
        </>
      )}
    </div>
  );
};
