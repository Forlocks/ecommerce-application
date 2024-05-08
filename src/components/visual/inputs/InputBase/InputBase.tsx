import React, { Component } from 'react';
import { InputProps } from './inputBaseInterface';

class Input extends Component<InputProps> {
  render() {
    const {
      label, type, placeholder, value, onChange, name, error,
    } = this.props;

    return (
      <div className="input-wrapper">
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

export { Input };
