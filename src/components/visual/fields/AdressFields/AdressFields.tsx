import React from 'react';
import { IAdressFields } from './IAdressFields';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { ListInput } from '../../inputs/ListInput/ListInput';

export const AdressFields: React.FC<IAdressFields> = ({
  country,
  countryError,
  onCountryChange,
  city,
  cityError,
  onCityChange,
  street,
  streetError,
  onStreetChange,
  postCode,
  postCodeError,
  onPostCodeChange,
}) => (
  <>
    <ListInput
      label="Country"
      name="country"
      placeholder="Enter your country"
      value={country}
      onChange={onCountryChange}
      error={countryError}
      options={['United States']}
    />
    <TextInput
      label="City"
      name="city"
      placeholder="Enter your city"
      value={city}
      onChange={onCityChange}
      error={cityError}
    />
    <TextInput
      label="Street"
      name="street"
      placeholder="Enter your street"
      value={street}
      onChange={onStreetChange}
      error={streetError}
    />
    <TextInput
      label="Post Code"
      name="postCode"
      placeholder="Enter your post code"
      value={postCode}
      onChange={onPostCodeChange}
      error={postCodeError}
    />
  </>
);
