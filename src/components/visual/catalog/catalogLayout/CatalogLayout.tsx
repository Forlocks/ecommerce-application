import React from 'react';
import './CatalogLayout.scss';
import { Outlet } from 'react-router-dom';
import { FilterForm } from '../../forms/FilterForm/FilterForm';
import { CatalogHeader } from '../catalogHeader/CatalogHeader';
import { IPage } from '../../../../pages/IPage';

export const CatalogLayout: React.FC<IPage> = () => (
  <div className="shop_page">
    <div className="shop_title">
      <h1>
        Our featured
        <br />
        products
      </h1>
    </div>
    <CatalogHeader />
    <div className="shop_container">
      <Outlet />
    </div>
    <div className="shop_aside">
      <FilterForm />
    </div>
  </div>
);
