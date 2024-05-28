import React from 'react';
import { InputBase } from '../InputBase/InputBase';
import { INumberInputProps } from './INumberInput';

export const NumberInput: React.FC<INumberInputProps> = ({
  min,
  max,
  step,
  onKeyDown,
  ...inputBaseProps
}) => (
  <div className="number-input">
    <InputBase {...inputBaseProps} type="number" />
  </div>
);
