import React from 'react';
import './ShopPage.scss';
import { ProductList } from '../../components/visual/product/ProductList/ProductList';

export const ShopPage: React.FC = function () {
  return (
    <div className="shop_page">
      <div className="shop_title">
        <h1>
          Our featured
          <br />
          products
        </h1>
      </div>
      <div className="shop_container">
        <ProductList />
      </div>
      <div className="shop_aside"></div>
    </div>
  );
};
