import React, { Component } from 'react';
import { IInputBase } from './IInputBase';

export class InputBase extends Component<IInputBase> {
  render() {
    const { label, type, placeholder, value, onChange, name, error } = this.props;

    return (
      <div className="input">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="error">{error}</div>}
      </div>
    );
  }
}
