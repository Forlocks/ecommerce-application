import React, { FC } from 'react';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';
import { IQuantityInputProps } from './IQuantityInputProps';

export const QuantityInput: FC<IQuantityInputProps> = ({ value, onIncrease, onDecrease }) => {
  return (
    <div className="quantity-input">
      <MediumButton type="button" onClick={onDecrease}>
        -
      </MediumButton>
      <input type="number" value={value} />
      <MediumButton type="button" onClick={onIncrease}>
        +
      </MediumButton>
    </div>
  );
};
