import React from 'react';
import { InputBase } from '../InputBase/InputBase';
import { IPasswordInput } from './IPasswordInput';

export const PasswordInput: React.FC<IPasswordInput> = function ({
  showPassword,
  togglePasswordVisibility,
  ...props
}) {
  return (
    <div style={{ position: 'relative' }}>
      <InputBase {...props} type={showPassword ? 'text' : 'password'} />
      <button
        onClick={togglePasswordVisibility}
        type="button"
        style={{ position: 'absolute', right: 0, top: 0 }}
      >
        {showPassword ? 'hide' : 'show'}
      </button>
    </div>
  );
};
