import '@testing-library/jest-dom/extend-expect';
import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  test('renders checkbox with label', () => {
    render(<Checkbox id="test-checkbox" label="Test Checkbox" onChange={() => {}} />);
    const checkboxElement = screen.getByLabelText(/test checkbox/i);
    expect(checkboxElement).toBeInTheDocument();
  });

  test('checkbox is unchecked by default', () => {
    render(<Checkbox id="test-checkbox" label="Test Checkbox" onChange={() => {}} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).not.toBeChecked();
  });

  test('checkbox can be checked/unchecked', () => {
    const Wrapper = () => {
      const [checked, setChecked] = useState(false);
      const handleChange = (isChecked: boolean | ((prevState: boolean) => boolean)) => {
        setChecked(isChecked);
      };
      return (
        <Checkbox
          id="test-checkbox"
          label="Test Checkbox"
          checked={checked}
          onChange={handleChange}
        />
      );
    };
    render(<Wrapper />);
    const checkboxElement = screen.getByRole('checkbox');

    expect(checkboxElement).not.toBeChecked();

    fireEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();

    fireEvent.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
  });

  test('checkbox respects the checked prop', () => {
    render(<Checkbox id="test-checkbox" label="Test Checkbox" checked onChange={() => {}} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeChecked();
  });
});
