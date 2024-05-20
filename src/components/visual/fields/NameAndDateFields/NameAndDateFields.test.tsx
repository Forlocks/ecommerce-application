import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NameAndDateFields } from './NameAndDateFields';
import { INameAndDateFieldProps } from './INameAndDateFields';

const props: INameAndDateFieldProps = {
  firstName: 'Aleksey',
  firstNameError: '',
  onFirstNameChange: jest.fn(),
  lastName: 'Exemplin',
  lastNameError: '',
  onLastNameChange: jest.fn(),
  dateOfBirth: '2000-01-01',
  dateOfBirthError: '',
  onDateOfBirthChange: jest.fn(),
};

test('renders without crashing', () => {
  render(<NameAndDateFields {...props} />);

  expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
});

test('displays first name, last name, and date of birth values correctly', () => {
  render(<NameAndDateFields {...props} />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const dateOfBirthInput = screen.getByLabelText(/date of birth/i);

  expect(firstNameInput).toHaveValue('Aleksey');
  expect(lastNameInput).toHaveValue('Exemplin');
  expect(dateOfBirthInput).toHaveValue('2000-01-01');
});

test('calls functions of changes when values are changed', () => {
  render(<NameAndDateFields {...props} />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const dateOfBirthInput = screen.getByLabelText(/date of birth/i);

  fireEvent.change(firstNameInput, { target: { value: 'Anna' } });
  fireEvent.change(lastNameInput, { target: { value: 'Exemplina' } });
  fireEvent.change(dateOfBirthInput, { target: { value: '1990-12-31' } });

  expect(props.onFirstNameChange).toHaveBeenCalled();
  expect(props.onLastNameChange).toHaveBeenCalled();
  expect(props.onDateOfBirthChange).toHaveBeenCalled();
});
