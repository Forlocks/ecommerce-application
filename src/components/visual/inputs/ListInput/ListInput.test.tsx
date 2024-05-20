import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ListInput } from './ListInput';

describe('ListInput', () => {
  test('renders list input with text type', () => {
    render(
      <ListInput
        label="Test list"
        options={['test option']}
        value=""
        name="test"
        onChange={() => {}}
      />,
    );
    const inputElement = screen.getByLabelText(/test list/i);
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('calls onChange function on input change', () => {
    const handleChange = jest.fn();
    render(
      <ListInput
        onChange={handleChange}
        options={['test option']}
        label="Test list"
        value=""
        name="test"
      />,
    );
    const inputElement = screen.getByLabelText(/test list/i);
    fireEvent.change(inputElement, { target: { value: 'test option' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
