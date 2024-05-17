import React, { FC } from 'react';
import { IListInput } from './IListInput';

export const ListInput: FC<IListInput> = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  error,
  options,
}) => (
  <div className="input">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      list={`${name}-list`}
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <datalist id={`${name}-list`}>
      {options.map((option, index) => (
        <option key={index} value={option} />
      ))}
    </datalist>
    {error && <div className="error">{error}</div>}
  </div>
);
