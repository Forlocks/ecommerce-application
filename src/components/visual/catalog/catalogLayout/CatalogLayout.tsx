import React from 'react';
import './CatalogLayout.scss';
import { Outlet } from 'react-router-dom';
import { FilterForm } from '../../forms/FilterForm/FilterForm';
import { CatalogHeader } from '../catalogHeader/CatalogHeader';
import { ICatalogLayout } from './ICatalogLayout';

export const CatalogLayout: React.FC<ICatalogLayout> = ({ onFilterChange }) => (
  <div className="shop_page">
    <div className="shop_title">
      <h1>Our products</h1>
      <CatalogHeader />
    </div>
    <div className="shop_container">
      <Outlet />
    </div>
    <div className="shop_aside">
      <FilterForm onFilterChange={onFilterChange} />
    </div>
  </div>
);
