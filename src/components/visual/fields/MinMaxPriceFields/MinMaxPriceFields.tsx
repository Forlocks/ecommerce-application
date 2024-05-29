import React from 'react';
import { IMinMaxPriceFieldProps } from './IMinMaxPriceFieldProps';
import { NumberInput } from '../../inputs/NumberInput/NumberInput';

export const MinMaxPriceField: React.FC<IMinMaxPriceFieldProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onEnterPress,
  minPriceError,
  maxPriceError,
}) => (
  <>
    <NumberInput
      label="Price"
      type="number"
      name="minPrice"
      placeholder="Min"
      value={minPrice}
      onChange={onMinPriceChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onEnterPress();
      }}
      aria-label="Max"
      error={minPriceError}
    />
    <div className="dash">-</div>
    <NumberInput
      type="number"
      name="maxPrice"
      placeholder="Max"
      value={maxPrice}
      onChange={onMaxPriceChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onEnterPress();
      }}
      aria-label="Min"
      error={maxPriceError}
    />
  </>
);
