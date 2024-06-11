import React, { FC } from 'react';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';
import { IQuantityInputProps } from './IQuantityInputProps';

export const QuantityInput: FC<IQuantityInputProps> = ({
  value,
  onChange,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="quantity-input">
      <MediumButton type="button" onClick={onDecrease}>
        -
      </MediumButton>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <MediumButton type="button" onClick={onIncrease}>
        +
      </MediumButton>
    </div>
  );
};
