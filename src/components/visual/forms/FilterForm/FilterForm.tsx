import React, { ChangeEvent, FormEvent, useState } from 'react';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { IFilterFormProps } from './IFilterFormProps';
import { SearchInput } from '../../inputs/SearchInput/SearchInput';
import { ListInput } from '../../inputs/ListInput/ListInput';
import { MinMaxPriceField } from '../../fields/MinMaxPriceFields/MinMaxPriceFields';

export const FilterForm: React.FC<IFilterFormProps> = () => {
  const [search, setSearch] = useState('');
  const [sortByprice, setSortByPrice] = useState('');
  const [sortByName, setSortByName] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPriceError, setMinPriceError] = useState('');
  const [maxPriceError, setMaxPriceError] = useState('');

  // ------ Search --------
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    console.log('Search value:', search);
    // Здесь будет код для отправки значения на сервер для сортировки
    // Например:
    // sendSearchRequest(search);
  };

  // ------ Sort by --------
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPrice = event.target.value;
    setSortByPrice(newPrice);
    console.log('sortByprice value:', newPrice);
    // Здесь будет код для отправки значения на сервер для сортировки
    // Например:
    // sendSortRequest(newPrice);
  };

  const handleSortByNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSortOrder = event.target.value;
    setSortByName(newSortOrder);
    console.log('sortByName value:', newSortOrder);
    // Код для отправки запроса на сервер, чтобы отсортировать продукты
    // по названию в выбранном порядке
    // sendNameSortRequest(newSortOrder);
  };

  // ------ Filter by --------
  const handleMaterialFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newMaterialFilter = event.target.value;
    setMaterialFilter(newMaterialFilter);
    console.log('setMaterial value:', newMaterialFilter);
    // Код для отправки запроса на сервер, чтобы отфильтровать продукты
    // по выбранному материалу
    // sendMaterialFilterRequest(newMaterialFilter);
  };

  const handleStyleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newStyleFilter = event.target.value;
    setStyleFilter(newStyleFilter);
    console.log('setStyle value:', newStyleFilter);
    // Код для отправки запроса на сервер, чтобы отфильтровать продукты
    // по выбранному стилю
    // sendStyleFilterRequest(newStyleFilter);
  };

  const onMinPriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setMinPrice(value);

    // Validate the minimum price
    if (value === '') {
      setMinPriceError('required');
    } else if (maxPrice && parseFloat(value) > parseFloat(maxPrice)) {
      setMinPriceError('max < min');
    } else {
      setMinPriceError('');
    }
  };

  const onMaxPriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setMaxPrice(value);

    // Validate the maximum price
    if (value === '') {
      setMaxPriceError('required');
    } else if (minPrice && parseFloat(value) < parseFloat(minPrice)) {
      setMaxPriceError('max < min');
    } else {
      setMaxPriceError('');
    }
  };

  const onEnterPress = () => {
    if (minPrice && maxPrice && parseFloat(minPrice) <= parseFloat(maxPrice)) {
      console.log(`Отправка: Мин. цена - ${minPrice}, Макс. цена - ${maxPrice}`);
      // Здесь код для отправки данных на сервер...
    } else {
      // Обработка ошибок, если цены не введены или минимальная цена больше максимальной
      setMinPriceError(minPrice ? '' : 'Введите минимальную цену');
      setMaxPriceError(
        maxPrice
          ? parseFloat(minPrice) <= parseFloat(maxPrice)
            ? ''
            : 'Минимальная цена должна быть меньше максимальной'
          : 'Введите максимальную цену',
      );
    }
  };

  const handleClear = () => {
    setSearch('');
    setSortByPrice('');
    setSortByName('');
    setMaterialFilter('');
    setStyleFilter('');
    setMinPrice('');
    setMaxPrice('');
    setMinPriceError('');
    setMaxPriceError('');
    console.log('Filters cleared');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        label="Search"
        placeholder="Type to search..."
        value={search}
        onChange={handleSearchChange}
        name="search"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearchSubmit(e);
        }}
      />
      <div className="sort-container">
        <span>Sort by...</span>
        <ListInput
          label="Name"
          placeholder="Sort by name"
          options={['A-Z', 'Z-A']}
          value={sortByName}
          onChange={handleSortByNameChange}
          name="nameSort"
        />
        <ListInput
          label="Price"
          placeholder="Sort by price"
          options={['Min price', 'Max price']}
          value={sortByprice}
          onChange={handlePriceChange}
          name="priceSort"
        />
      </div>
      <div className="filter-container">
        <span>Filter by...</span>
        <ListInput
          label="Material"
          placeholder="Choose a material"
          options={['Ceramic', 'Glass']}
          value={materialFilter}
          onChange={handleMaterialFilterChange}
          name="materialFilter"
        />
        <ListInput
          label="Style"
          placeholder="Choose a style"
          options={['Modern', 'Classic']}
          value={styleFilter}
          onChange={handleStyleFilterChange}
          name="styleFilter"
        />
        <div className="minmax-container">
          <MinMaxPriceField
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={onMinPriceChange}
            onMaxPriceChange={onMaxPriceChange}
            onEnterPress={onEnterPress}
            minPriceError={minPriceError}
            maxPriceError={maxPriceError}
          />
        </div>
      </div>
      <div className="filter-buttons">
        <LargeButton type="button" onClick={handleClear}>
          Clear
        </LargeButton>
      </div>
    </form>
  );
};
