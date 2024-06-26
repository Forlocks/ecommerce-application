import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { EmailInput } from './EmailInput';

describe('EmailInput', () => {
  test('renders email input with email type', () => {
    render(<EmailInput label="Test email" value="" name="test" onChange={() => {}} />);
    const inputElement = screen.getByLabelText(/test email/i);
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  test('calls onChange function on input change', () => {
    const handleChange = jest.fn();
    render(<EmailInput onChange={handleChange} label="Test email" value="" name="test" />);
    const inputElement = screen.getByLabelText(/test email/i);
    fireEvent.change(inputElement, { target: { value: 'new email' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
