import React from 'react';
import { EmailInput } from '../../inputs/EmailInput/EmailInput';
import { PasswordInput } from '../../inputs/PasswordInput/PasswordInput';
import { IEmailAndPasswordFieldsProps } from './IEmailAndPasswordFields';

export const EmailAndPasswordFields: React.FC<IEmailAndPasswordFieldsProps> = ({
  email,
  emailError,
  onEmailChange,
  password,
  passwordError,
  onPasswordChange,
  showPassword,
  togglePasswordVisibility,
}) => (
  <>
    <EmailInput
      label="Email"
      name="email"
      placeholder="Enter your email"
      value={email}
      onChange={onEmailChange}
      error={emailError}
    />
    <PasswordInput
      label="Password"
      name="password"
      placeholder="Enter your password"
      value={password}
      onChange={onPasswordChange}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      error={passwordError}
    />
  </>
);
