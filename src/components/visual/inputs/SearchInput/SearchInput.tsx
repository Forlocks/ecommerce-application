import React, { FC } from 'react';
import { ISearchInputProps } from './ISearchInputProps';

export const SearchInput: FC<ISearchInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  onKeyDown,
}) => (
  <div className="input">
    <label htmlFor={name}>{label}</label>
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={name}
      onKeyDown={onKeyDown}
    />
  </div>
);
