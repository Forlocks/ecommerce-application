import React from 'react';
import { INumberInputProps } from './INumberInput';

export const NumberInput: React.FC<INumberInputProps> = ({
  min,
  max,
  step,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  id,
  name,
  error,
}) => (
  <div className="input">
    {label && <label htmlFor={id || name}>{label}</label>}
    <input
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id || name}
      onKeyDown={onKeyDown}
      min={min}
      max={max}
      step={step}
    />
    {error && <div className="error">{error}</div>}
  </div>
);
