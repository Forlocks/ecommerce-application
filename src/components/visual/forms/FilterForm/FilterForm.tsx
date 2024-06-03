import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IFilterFormProps } from './IFilterFormProps';
import { SearchInput } from '../../inputs/SearchInput/SearchInput';
import { ListInput } from '../../inputs/ListInput/ListInput';
import { MinMaxPriceField } from '../../fields/MinMaxPriceFields/MinMaxPriceFields';
import { validateMinPrice, validateMaxPrice } from '../../../non-visual/validators/validators';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';
import { Checkbox } from '../../checkbox/Checkbox';

export const FilterForm: React.FC<IFilterFormProps> = ({ onFilterChange }) => {
  const clear = <img src="/assets/icons/clear.svg" alt="clear" />;
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
  const [sortByPrice, setSortByPrice] = useState('');
  const [sortByName, setSortByName] = useState('');
  const [styleFilter, setStyleFilter] = useState('');

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minPriceError, setMinPriceError] = useState('');
  const [maxPriceError, setMaxPriceError] = useState('');

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const isFormEmpty =
    !search &&
    !sortByPrice &&
    !sortByName &&
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
    if (onFilterChange) {
      onFilterChange(
        selectedColors,
        styleFilter,
        selectedMaterials,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        sortByPrice,
        sortByName,
        search,
      );
    }
  };

  // ------ Sort by --------
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPrice = event.target.value;
    setSortByPrice(newPrice);
    console.log('sortByPrice value:', newPrice);
    if (onFilterChange) {
      onFilterChange(
        selectedColors,
        styleFilter,
        selectedMaterials,
        minPrice ? parseFloat(minPrice) : null,
        maxPrice ? parseFloat(maxPrice) : null,
        newPrice,
        sortByName,
        search,
      );
    }
  };

  const handleSortByNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSortOrder = event.target.value;
    setSortByName(newSortOrder);
    console.log('sortByName value:', newSortOrder);
    if (onFilterChange) {
      onFilterChange(
        selectedColors,
        styleFilter,
        selectedMaterials,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        sortByPrice,
        newSortOrder,
        search,
      );
    }
  };

  const handleStyleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newStyleFilter = event.target.value;
    setStyleFilter(newStyleFilter);
    console.log('setStyle value:', newStyleFilter);
    if (onFilterChange) {
      onFilterChange(
        selectedColors,
        newStyleFilter,
        selectedMaterials,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        sortByPrice,
        sortByName,
        search,
      );
    }
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
    } else {
      setMinPriceError('max < min');
      setMaxPriceError('');
    }
    if (onFilterChange) {
      onFilterChange(
        selectedColors,
        styleFilter,
        selectedMaterials,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        sortByPrice,
        sortByName,
        search,
      );
    }
  };

  const handleColorChange = (color: string) => (checked: boolean) => {
    const updatedColors = checked
      ? [...selectedColors, color]
      : selectedColors.filter((c) => c !== color);
    setSelectedColors(updatedColors);
    if (onFilterChange) {
      onFilterChange(
        updatedColors,
        styleFilter,
        selectedMaterials,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        sortByPrice,
        sortByName,
        search,
      );
    }

    console.log(`Filtered by colors: ${updatedColors.join(', ')}`);
  };

  const handleMaterialChange = (material: string) => (checked: boolean) => {
    const updatedMaterials = checked
      ? [...selectedMaterials, material]
      : selectedMaterials.filter((c) => c !== material);
    setSelectedMaterials(updatedMaterials);
    if (onFilterChange) {
      onFilterChange(
        selectedColors,
        styleFilter,
        updatedMaterials,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        sortByPrice,
        sortByName,
        search,
      );
    }
    console.log(`Filtered by materials: ${updatedMaterials.join(', ')}`);
  };

  const handleClear = () => {
    setSearch('');
    setSortByPrice('');
    setSortByName('');
    setStyleFilter('');
    setMinPrice('');
    setMaxPrice('');
    setMinPriceError('');
    setMaxPriceError('');
    setSelectedColors([]);
    setSelectedMaterials([]);
    console.log('Filters cleared');
    if (onFilterChange) {
      onFilterChange([], '', [], null, null, '', '', '');
    }
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
          value={sortByPrice}
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
