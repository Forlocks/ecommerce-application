import React, { useState } from 'react';
import { IPage } from '../IPage';
import './CartPage.scss';
import { OrderForm } from '../../components/visual/forms/OrderForm/OrderForm';
import { ProductCartList } from '../../components/visual/product/ProductCartList/ProductCartList';
import { getCart } from '../../controllers/api/Cart';

export const CartPage: React.FC<IPage> = function () {
  const [totalPrice, setTotalPrice] = useState(0);

  const updateTotalPrice = async () => {
    const cartsArr = await getCart();
    const newTotalPrice = cartsArr[cartsArr.length - 1].totalPrice.centAmount / 100;
    setTotalPrice(newTotalPrice);
  };

  return (
    <div className="cart_page">
      <div className="cart_title">
        <h1>Shoping cart</h1>
      </div>
      <div className="cart_container">
        <ProductCartList updateTotalPrice={updateTotalPrice} />
      </div>
      <div className="cart_aside">
        <OrderForm totalPrice={totalPrice} />
      </div>
    </div>
  );
};
