import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DateInput } from './DateInput';

describe('DateInput', () => {
  test('renders date input with date type', () => {
    render(<DateInput label="Test date" value="" name="test" onChange={() => {}} />);
    const inputElement = screen.getByLabelText(/test date/i);
    expect(inputElement).toHaveAttribute('type', 'date');
  });

  test('calls onChange function on input change', () => {
    const handleChange = jest.fn();
    render(<DateInput onChange={handleChange} label="Test date" value="" name="test" />);
    const inputElement = screen.getByLabelText(/test date/i);
    fireEvent.change(inputElement, { target: { value: '2024-05-20' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
