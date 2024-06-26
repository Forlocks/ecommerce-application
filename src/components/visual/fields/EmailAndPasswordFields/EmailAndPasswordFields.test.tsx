import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmailAndPasswordFields } from './EmailAndPasswordFields';
import { IEmailAndPasswordFieldsProps } from './IEmailAndPasswordFields';

const props: IEmailAndPasswordFieldsProps = {
  email: 'test@examplemail.com',
  emailError: '',
  onEmailChange: jest.fn(),
  password: 'password12345',
  passwordError: '',
  onPasswordChange: jest.fn(),
  showPassword: false,
  togglePasswordVisibility: jest.fn(),
};

test('renders without crashing', () => {
  render(<EmailAndPasswordFields {...props} />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('displays email and password values correctly', () => {
  render(<EmailAndPasswordFields {...props} />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toHaveValue('test@examplemail.com');
  expect(passwordInput).toHaveValue('password12345');
});

test('calls onEmailChange and onPasswordChange when values are changed', () => {
  render(<EmailAndPasswordFields {...props} />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'newemail@examplemail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'newpassword12345' } });

  expect(props.onEmailChange).toHaveBeenCalled();
  expect(props.onPasswordChange).toHaveBeenCalled();
});
