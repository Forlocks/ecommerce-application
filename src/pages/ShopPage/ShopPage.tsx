import React, { useState } from 'react';
import './ShopPage.scss';
import { ProductList } from '../../components/visual/product/ProductList/ProductList';
import { FilterForm } from '../../components/visual/forms/FilterForm/FilterForm';
import { IPage } from '../IPage';

export const ShopPage: React.FC<IPage> = function () {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortByPrice, setSortByPrice] = useState<string>('');
  const [sortByName, setSortByName] = useState<string>('');
  const [search, setSearch] = useState('');

  const handleFilterChange = (
    colors: string[],
    style: string,
    materials: string[],
    newMinPrice: number | null,
    newMaxPrice: number | null,
    newSortByPrice: string,
    newSortByName: string,
    newSearch: string,
  ) => {
    setSelectedColors(colors);
    setSelectedStyle(style);
    setSelectedMaterials(materials);
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setSortByPrice(newSortByPrice);
    setSortByName(newSortByName);
    setSearch(newSearch);
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
          minPrice={minPrice}
          maxPrice={maxPrice}
          sortByPrice={sortByPrice}
          sortByName={sortByName}
          search={search}
        />
      </div>
      <div className="shop_aside">
        <FilterForm onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};
