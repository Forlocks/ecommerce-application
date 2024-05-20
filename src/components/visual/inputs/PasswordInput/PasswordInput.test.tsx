import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  test('renders password input with text type when showPassword=true', () => {
    render(
      <PasswordInput
        label="Test password"
        value=""
        name="test"
        onChange={() => {}}
        showPassword={true}
        togglePasswordVisibility={() => {}}
      />,
    );
    const inputElement = screen.getByLabelText(/test password/i);
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('renders password input with password type when showPassword=false', () => {
    render(
      <PasswordInput
        label="Test password"
        value=""
        name="test"
        onChange={() => {}}
        showPassword={false}
        togglePasswordVisibility={() => {}}
      />,
    );
    const inputElement = screen.getByLabelText(/test password/i);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  test('calls onChange function on input change', () => {
    const handleChange = jest.fn();
    render(
      <PasswordInput
        label="Test password"
        value=""
        name="test"
        onChange={handleChange}
        showPassword
        togglePasswordVisibility={() => {}}
      />,
    );
    const inputElement = screen.getByLabelText(/test password/i);
    fireEvent.change(inputElement, { target: { value: 'new password' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
