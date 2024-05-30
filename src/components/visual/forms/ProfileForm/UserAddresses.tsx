import React, { ChangeEvent, useState } from 'react';
import { IUserAddresses } from './IUserAddresses';
import { user } from '../../../..';
import { AdressFields } from '../../fields/AdressFields/AdressFields';
import { Checkbox } from '../../checkbox/Checkbox';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';
import {
  validateCity,
  validateCountry,
  validatePostCode,
  validateStreet,
} from '../../../non-visual/validators/validators';

export const UserAddresses: React.FC<IUserAddresses> = ({
  addresses,
  updateAddresses,
  fetchUserData,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState({
    country: '',
    countryError: '',
    city: '',
    cityError: '',
    street: '',
    streetError: '',
    postalCode: '',
    postalCodeError: '',
    isBilling: false,
    isShipping: false,
    isDefaultBilling: false,
    isDefaultShipping: false,
  });

  async function handleDelete(id: string, version: number) {
    try {
      await user.removeUserAddress(version, id);
      const updatedAddresses = addresses.filter((address) => address.id !== id);
      updateAddresses(updatedAddresses);
      fetchUserData();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  }

  const handleEdit = (index: number) => {
    if (editIndex === index) {
      setEditIndex(null);
      setEditMode(false);
    } else {
      setEditIndex(index);
      setEditMode(true);
      const addressToEdit = addresses[index];
      setNewAddress({
        country: addressToEdit.country,
        countryError: '',
        city: addressToEdit.city,
        cityError: '',
        street: addressToEdit.street,
        streetError: '',
        postalCode: addressToEdit.postalCode,
        postalCodeError: '',
        isBilling: addressToEdit.isBilling,
        isShipping: addressToEdit.isShipping,
        isDefaultBilling: addressToEdit.isDefaultBilling,
        isDefaultShipping: addressToEdit.isDefaultShipping,
      });
    }
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = event.target;
    let error = '';
    switch (field) {
      case 'country':
        error = validateCountry(value);
        break;
      case 'city':
        error = validateCity(value);
        break;
      case 'street':
        error = validateStreet(value);
        break;
      case 'postalCode':
        error = validatePostCode(value);
        break;
      default:
        break;
    }
    setNewAddress((prevState) => ({
      ...prevState,
      [field]: value,
      [`${field}Error`]: error,
    }));
  };

  const handleSaveChanges = () => {
    setEditIndex(null);
    setEditMode(false);
  };

  // ----------------------------------------------

  // const handleCountryChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //   const newCountry = event.target.value;
  //   const newCountryError = validateCountry(newCountry);
  //   setNewAddress((prevState) => ({
  //     ...prevState,
  //     newCountry,
  //     newCountryError,
  //   }));
  // };

  // ----------------------------------------------

  return (
    <>
      <table className="addresses-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Street</th>
            <th>Postal Code</th>
            <th>Address Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((row, index) => {
            const addressTypes = [];
            if (row.isBilling) addressTypes.push('Billing');
            if (row.isShipping) addressTypes.push('Shipping');
            if (row.isDefaultBilling) addressTypes.push('Default Billing');
            if (row.isDefaultShipping) addressTypes.push('Default Shipping');
            return (
              <tr key={index} className={editIndex === index ? 'edit-mode' : ''}>
                <td>{row.country}</td>
                <td>{row.city}</td>
                <td>{row.street}</td>
                <td>{row.postalCode}</td>
                <td>
                  {addressTypes.map((type, indx) => (
                    <React.Fragment key={indx}>
                      {type}
                      {indx < addressTypes.length - 1 && <hr />}
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  <div onClick={() => handleEdit(index)}>
                    <img
                      src="./assets/icons/Edit-Icon.png"
                      alt="edit"
                      style={{ cursor: 'pointer' }}
                    ></img>
                  </div>
                </td>
                <td>
                  <div onClick={() => handleDelete(row.id, row.version)}>
                    <img
                      width={16}
                      src="./assets/icons/clear.svg"
                      alt="edit"
                      style={{ opacity: 0.5, cursor: 'pointer' }}
                    ></img>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isEditMode && (
        <>
          <div className="fields-container">
            <AdressFields
              country={'United States'}
              countryError={''}
              onCountryChange={(event) => handleFieldChange(event, 'country')}
              city={newAddress.city}
              cityError={newAddress.cityError}
              onCityChange={(event) => handleFieldChange(event, 'city')}
              street={newAddress.street}
              streetError={newAddress.streetError}
              onStreetChange={(event) => handleFieldChange(event, 'street')}
              postCode={newAddress.postalCode}
              postCodeError={newAddress.postalCodeError}
              onPostCodeChange={(event) => handleFieldChange(event, 'postalCode')}
            />
            <Checkbox
              id="billing-address"
              checked={newAddress.isBilling}
              onChange={() => {
                setNewAddress((prevState) => ({
                  ...prevState,
                  isBilling: !prevState.isBilling,
                }));
              }}
              label="set as billing address"
            />
            <Checkbox
              id="shipping-address"
              checked={newAddress.isShipping}
              onChange={() => {
                setNewAddress((prevState) => ({
                  ...prevState,
                  isShipping: !prevState.isShipping,
                }));
              }}
              label="set as shipping billing"
            />
            <Checkbox
              id="default-billing-address"
              checked={newAddress.isDefaultBilling}
              onChange={() => {
                setNewAddress((prevState) => ({
                  ...prevState,
                  isDefaultBilling: !prevState.isDefaultBilling,
                }));
              }}
              label="set as default billing address"
            />
            <Checkbox
              id="default-shipping-address"
              checked={newAddress.isDefaultShipping}
              onChange={() => {
                setNewAddress((prevState) => ({
                  ...prevState,
                  isDefaultShipping: !prevState.isDefaultShipping,
                }));
              }}
              label="set as default shipping address"
            />
          </div>
          <MediumButton onClick={handleSaveChanges} children={<div>save changes</div>} />
        </>
      )}
    </>
  );
};
