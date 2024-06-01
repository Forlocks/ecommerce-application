import React, { useState } from 'react';
import './ShopPage.scss';
import { ProductList } from '../../components/visual/product/ProductList/ProductList';
import { FilterForm } from '../../components/visual/forms/FilterForm/FilterForm';
import { IPage } from '../IPage';

export const ShopPage: React.FC<IPage> = function () {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleFilterChange = (colors: string[], style: string, materials: string[]) => {
    setSelectedColors(colors);
    setSelectedStyle(style);
    setSelectedMaterials(materials);
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
        <ProductList
          selectedColors={selectedColors}
          selectedStyle={selectedStyle}
          selectedMaterials={selectedMaterials}
        />
      </div>
      <div className="shop_aside">
        <FilterForm onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};
