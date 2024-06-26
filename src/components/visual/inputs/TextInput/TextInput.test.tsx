import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  test('renders text input with text type', () => {
    render(<TextInput label="Test text" value="" name="test" onChange={() => {}} />);
    const inputElement = screen.getByLabelText(/test text/i);
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('calls onChange function on input change', () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} label="Test text" value="" name="test" />);
    const inputElement = screen.getByLabelText(/test text/i);
    fireEvent.change(inputElement, { target: { value: 'new text' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
