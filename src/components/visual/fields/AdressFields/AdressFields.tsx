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
  prefix = 'default',
}) => (
  <>
    <div className="country-city">
      <ListInput
        label="Country"
        name="country"
        placeholder="Enter your country"
        value={country}
        onChange={onCountryChange}
        error={countryError}
        options={['United States']}
        id={`${prefix}-country`}
      />
      <TextInput
        label="City"
        name="city"
        placeholder="Enter your city"
        value={city}
        onChange={onCityChange}
        error={cityError}
        id={`${prefix}-city`}
      />
    </div>
    <div className="street-post">
      <TextInput
        label="Street"
        name="street"
        placeholder="Enter your street"
        value={street}
        onChange={onStreetChange}
        error={streetError}
        id={`${prefix}-street`}
      />
      <TextInput
        label="Post Code"
        name="postCode"
        placeholder="Enter"
        value={postCode}
        onChange={onPostCodeChange}
        error={postCodeError}
        id={`${prefix}-postCode`}
      />
    </div>
  </>
);
