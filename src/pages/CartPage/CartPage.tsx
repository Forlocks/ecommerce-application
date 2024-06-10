import React from 'react';
import { IPage } from '../IPage';
import './CartPage.scss';
import { OrderForm } from '../../components/visual/forms/OrderForm/OrderForm';
import { ProductCartList } from '../../components/visual/product/ProductCartList/ProductCartList';

export const CartPage: React.FC<IPage> = function () {
  return (
    <div className="cart_page">
      <div className="cart_title">
        <h1>Shoping cart</h1>
      </div>
      <div className="cart_container">
        <ProductCartList />
      </div>
      <div className="cart_aside">
        <OrderForm />
      </div>
    </div>
  );
};
