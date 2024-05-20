import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdressFields } from './AdressFields';
import { IAdressFields } from './IAdressFields';

const props: IAdressFields = {
  country: 'United States',
  countryError: '',
  onCountryChange: jest.fn(),
  city: 'New York',
  cityError: '',
  onCityChange: jest.fn(),
  street: '5th Avenue',
  streetError: '',
  onStreetChange: jest.fn(),
  postCode: '10001',
  postCodeError: '',
  onPostCodeChange: jest.fn(),
  prefix: 'test',
};

test('renders without crashing', () => {
  render(<AdressFields {...props} />);

  expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/post code/i)).toBeInTheDocument();
});

test('displays adress values correctly', () => {
  render(<AdressFields {...props} />);

  const countryInput = screen.getByLabelText(/country/i);
  const cityInput = screen.getByLabelText(/city/i);
  const streetInput = screen.getByLabelText(/street/i);
  const postCodeInput = screen.getByLabelText(/post code/i);

  expect(countryInput).toHaveValue('United States');
  expect(cityInput).toHaveValue('New York');
  expect(streetInput).toHaveValue('5th Avenue');
  expect(postCodeInput).toHaveValue('10001');
});

test('calls functions of changes when values are changed', () => {
  render(<AdressFields {...props} />);

  const countryInput = screen.getByLabelText(/country/i);
  const cityInput = screen.getByLabelText(/city/i);
  const streetInput = screen.getByLabelText(/street/i);
  const postCodeInput = screen.getByLabelText(/post code/i);

  fireEvent.change(countryInput, { target: { value: 'Russia' } });
  fireEvent.change(cityInput, { target: { value: 'Moscow' } });
  fireEvent.change(streetInput, { target: { value: 'Arbat' } });
  fireEvent.change(postCodeInput, { target: { value: '196000' } });

  expect(props.onCountryChange).toHaveBeenCalled();
  expect(props.onCityChange).toHaveBeenCalled();
  expect(props.onStreetChange).toHaveBeenCalled();
  expect(props.onPostCodeChange).toHaveBeenCalled();
});
