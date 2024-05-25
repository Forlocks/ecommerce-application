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
  emailDisabled,
  passwordDisabled,
  passwordPlaceholder = 'Enter your password',
}) => (
  <>
    <EmailInput
      label="Email"
      name="email"
      placeholder={'Enter your email'}
      value={email}
      onChange={onEmailChange}
      error={emailError}
      disabled={emailDisabled}
    />
    <PasswordInput
      label="Password"
      name="password"
      placeholder={passwordPlaceholder}
      value={password}
      onChange={onPasswordChange}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      error={passwordError}
      disabled={passwordDisabled}
    />
  </>
);
