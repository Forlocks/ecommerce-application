import React, { useState } from 'react';
import './ShopPage.scss';
import { ProductList } from '../../components/visual/product/ProductList/ProductList';
import { FilterForm } from '../../components/visual/forms/FilterForm/FilterForm';
import { IPage } from '../IPage';

export const ShopPage: React.FC<IPage> = function () {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleColorFilterChange = (colors: string[]) => {
    setSelectedColors(colors);
  };

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
        <ProductList selectedColors={selectedColors} />
      </div>
      <div className="shop_aside">
        <FilterForm onColorFilterChange={handleColorFilterChange} />
      </div>
    </div>
  );
};
