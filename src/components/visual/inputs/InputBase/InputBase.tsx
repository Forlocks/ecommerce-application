import React, { FC } from 'react';
import { IInputBase } from './IInputBase';

export const InputBase: FC<IInputBase> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  error,
}) => (
  <div className="input">
    {label && <label htmlFor={name}>{label}</label>}
    <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    {error && <div className="error">{error}</div>}
  </div>
);
