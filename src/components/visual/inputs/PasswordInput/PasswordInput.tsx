import React from 'react';
import { InputBase } from '../InputBase/InputBase';
import { IPasswordInput } from './IPasswordInput';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';

const hideEyeIcon = <img src="./assets/icons/eye-hide.svg" alt="Big image" />;
const showEyeIcon = <img src="./assets/icons/eye-open.svg" alt="Big image" />;

export const PasswordInput: React.FC<IPasswordInput> = function ({
  showPassword,
  togglePasswordVisibility,
  ...props
}) {
  return (
    <div className="password">
      <InputBase {...props} type={showPassword ? 'text' : 'password'} />
      <SmallButton
        onClick={togglePasswordVisibility}
        icon={showPassword ? hideEyeIcon : showEyeIcon}
        style={{ position: 'absolute', right: 16, top: 33 }}
      />
    </div>
  );
};
