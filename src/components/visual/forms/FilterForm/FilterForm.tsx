import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IFilterFormProps } from './IFilterFormProps';
import { SearchInput } from '../../inputs/SearchInput/SearchInput';
import { ListInput } from '../../inputs/ListInput/ListInput';
import { MinMaxPriceField } from '../../fields/MinMaxPriceFields/MinMaxPriceFields';
import { validateMinPrice, validateMaxPrice } from '../../../non-visual/validators/validators';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';
import { Checkbox } from '../../checkbox/Checkbox';

export const FilterForm: React.FC<IFilterFormProps> = ({ onColorFilterChange }) => {
  const clear = <img src="./assets/icons/clear.svg" alt="clear" />;
  const colorNames = [
    'gray',
    'green',
    'blue',
    'yellow',
    'black',
    'white',
    'orange',
    'purple',
    'pink',
    'brown',
  ];

  const materialNames = ['ceramic', 'glass', 'resin', 'metal'];

  const [search, setSearch] = useState('');
  const [sortByprice, setSortByPrice] = useState('');
  const [sortByName, setSortByName] = useState('');
  //   const [materialFilter, setMaterialFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPriceError, setMinPriceError] = useState('');
  const [maxPriceError, setMaxPriceError] = useState('');

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const isFormEmpty =
    !search &&
    !sortByprice &&
    !sortByName &&
    // !materialFilter &&
    !styleFilter &&
    !minPrice &&
    !maxPrice &&
    selectedColors.length === 0 &&
    selectedMaterials.length === 0;

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
  //   const handleMaterialFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //     const newMaterialFilter = event.target.value;
  //     setMaterialFilter(newMaterialFilter);
  //     console.log('setMaterial value:', newMaterialFilter);
  //     // Код для отправки запроса на сервер, чтобы отфильтровать продукты
  //     // по выбранному материалу
  //     // sendMaterialFilterRequest(newMaterialFilter);
  //   };

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
    const error = validateMinPrice(value, maxPrice);
    setMinPriceError(error);
  };

  const onMaxPriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setMaxPrice(value);
    const error = validateMaxPrice(value, minPrice);
    setMaxPriceError(error);
  };

  const onEnterPress = () => {
    const minPriceValue = minPrice ? parseFloat(minPrice) : 0;
    const maxPriceValue = maxPrice ? parseFloat(maxPrice) : 1000;

    const minError = validateMinPrice(minPrice || '', maxPrice);
    const maxError = validateMaxPrice(maxPrice || '', minPrice);

    setMinPriceError(minError);
    setMaxPriceError(maxError);

    if (minPriceError || maxPriceError) {
      return;
    }

    if (minPriceValue <= maxPriceValue) {
      const minPriceToSend = minPriceValue * 100;
      const maxPriceToSend = maxPriceValue * 100;
      console.log(`Мин. цена - ${minPriceToSend}, Макс. цена - ${maxPriceToSend}`);
      // Код для отправки запроса на сервер, чтобы отфильтровать продукты по цене
      // sendPriceFilterRequest(minPriceValue, maxPriceValue);

      if (minPriceValue === 0) setMinPrice('0');
      if (maxPriceValue === 1000) setMaxPrice('1000');
    } else {
      setMinPriceError('max < min');
      setMaxPriceError('');
    }
  };

  const handleColorChange = (color: string) => (checked: boolean) => {
    const updatedColors = checked
      ? [...selectedColors, color]
      : selectedColors.filter((c) => c !== color);
    setSelectedColors(updatedColors);
    if (onColorFilterChange) onColorFilterChange(updatedColors);

    console.log(`Filtered by colors: ${updatedColors.join(', ')}`);
    // Здесь будет код для отправки значения на сервер для фильтрации
    // Например:
    // sendColorFilterRequest(updatedColors);
  };

  const handleMaterialChange = (material: string) => (checked: boolean) => {
    const updatedMaterials = checked
      ? [...selectedMaterials, material]
      : selectedMaterials.filter((c) => c !== material);
    setSelectedMaterials(updatedMaterials);

    console.log(`Filtered by materials: ${updatedMaterials.join(', ')}`);
    // Здесь будет код для отправки значения на сервер для фильтрации
    // Например:
    // sendMaterialFilterRequest(updatedMaterial);
  };

  const handleClear = () => {
    setSearch('');
    setSortByPrice('');
    setSortByName('');
    // setMaterialFilter('');
    setStyleFilter('');
    setMinPrice('');
    setMaxPrice('');
    setMinPriceError('');
    setMaxPriceError('');
    setSelectedColors([]);
    setSelectedMaterials([]);
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
        {/* <ListInput
          label="Material"
          placeholder="Choose a material"
          options={['Ceramic', 'Glass']}
          value={materialFilter}
          onChange={handleMaterialFilterChange}
          name="materialFilter"
        /> */}
        <ListInput
          label="Style"
          placeholder="Choose a style"
          options={['modern', 'classic', 'minimalism']}
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
        <label className="color">Color</label>
        <div className="color-container">
          {colorNames.map((color, index) => (
            <Checkbox
              key={index}
              id={`color-${index + 1}`}
              checked={selectedColors.includes(color)}
              onChange={handleColorChange(color)}
              label={color}
            />
          ))}
        </div>
        <label className="material">Material</label>
        <div className="material-container">
          {materialNames.map((material, index) => (
            <Checkbox
              key={index}
              id={`material-${index + 1}`}
              checked={selectedMaterials.includes(material)}
              onChange={handleMaterialChange(material)}
              label={material}
            />
          ))}
        </div>
      </div>
      <div className="filter-buttons">
        <SmallButton onClick={handleClear} icon={clear} disabled={isFormEmpty} />
      </div>
    </form>
  );
};
