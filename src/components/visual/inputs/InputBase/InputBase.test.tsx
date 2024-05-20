import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { InputBase } from './InputBase';

describe('InputBase', () => {
  test('renders input with label', () => {
    render(<InputBase label="Test label input" value="" name="test" onChange={() => {}} />);
    const inputElement = screen.getByLabelText(/test label input/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders correctly with required props', () => {
    render(<InputBase value="" name="test" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders input with placeholder', () => {
    render(<InputBase placeholder="Test placeholder" value="" name="test" onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/test placeholder/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('display error message', () => {
    render(<InputBase error="Test error message" value="" name="test" onChange={() => {}} />);
    const inputElement = screen.getByText(/test error message/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange function on input change', () => {
    const handleChange = jest.fn();
    render(<InputBase onChange={handleChange} value="" name="test" />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
