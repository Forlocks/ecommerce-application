import { ChangeEvent } from 'react';

export interface IAdressFields {
  country: string;
  countryError: string;
  onCountryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  city: string;
  cityError: string;
  onCityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  street: string;
  streetError: string;
  onStreetChange: (event: ChangeEvent<HTMLInputElement>) => void;
  postCode: string;
  postCodeError: string;
  onPostCodeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
