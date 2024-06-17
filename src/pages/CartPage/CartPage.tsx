import React, { useState } from 'react';
import './CartPage.scss';
import { OrderForm } from '../../components/visual/forms/OrderForm/OrderForm';
import { ProductCartList } from '../../components/visual/product/ProductCartList/ProductCartList';
import { getCart } from '../../controllers/api/Cart';
import { ICartPage } from './ICartPage';

export const CartPage: React.FC<ICartPage> = ({
  openModal,
  closeModal,
  updateCartItemsQuantity,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const [cartItemsQuantity, setCartItemsQuantity] = useState(0);
  const [appliedPromoCodes, setAppliedPromoCodes] = useState<string[]>([]);

  const updateTotalPrice = async () => {
    try {
      const cartsArr = await getCart();
      const cart = cartsArr[cartsArr.length - 1];

      // Calculate original total price before discounts
      let newOriginalTotalPrice = 0;
      cart.lineItems.forEach((item) => {
        newOriginalTotalPrice += item.totalPrice.centAmount;
      });

      // Calculate total price after discounts
      const newTotalPrice = cart.totalPrice.centAmount / 100;

      // Get quantity of items in cart
      const itemQuantity = cart.totalLineItemQuantity;

      // // Get applied promo codes
      const PromoCodes: string[] = cart.discountCodes.map((discount) => discount.discountCode.id);

      // Update state
      setTotalPrice(newTotalPrice);
      setOriginalTotalPrice(newOriginalTotalPrice / 100);
      if (itemQuantity !== undefined) {
        setCartItemsQuantity(itemQuantity);
        updateCartItemsQuantity(itemQuantity);
      }
      setAppliedPromoCodes(PromoCodes);
    } catch (error) {
      console.error('Error updating total price:', error);
    }
  };

  return (
    <div className="cart_page">
      <div className="cart_title">
        <h1>Shoping cart</h1>
      </div>
      <div className="cart_container">
        <ProductCartList
          updateTotalPrice={updateTotalPrice}
          openModal={openModal}
          closeModal={closeModal}
          updateCartItemsQuantity={updateCartItemsQuantity}
        />
      </div>
      <div className="cart_aside">
        {totalPrice > 0 && (
          <OrderForm
            totalPrice={totalPrice}
            originalTotalPrice={originalTotalPrice}
            cartItemsQuantity={cartItemsQuantity}
            appliedPromoCodes={appliedPromoCodes}
          />
        )}
      </div>
    </div>
  );
};
