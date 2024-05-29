import React from 'react';
import './ShopPage.scss';
import { ProductList } from '../../components/visual/product/ProductList/ProductList';
import { FilterForm } from '../../components/visual/forms/FilterForm/FilterForm';
import { IPage } from '../IPage';

export const ShopPage: React.FC<IPage> = function () {
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
      <div className="shop_aside">
        <FilterForm />
      </div>
    </div>
  );
};
