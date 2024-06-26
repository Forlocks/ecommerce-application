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
  id,
}) => (
  <div className="input">
    {label && <label htmlFor={id || name}>{label}</label>}
    <input
      id={id || name}
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
