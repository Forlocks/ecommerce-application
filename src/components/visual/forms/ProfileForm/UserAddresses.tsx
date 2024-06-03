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
    version: 0,
    addressId: '',
  });

  const [prevAddress, setPrevAddress] = useState({
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
        version: addressToEdit.version,
        addressId: addressToEdit.id,
      });
      setPrevAddress({
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

  const addAddressBillingType = async () => {
    const result = await user.getUser();
    await user.addBillingType(result.body.version, newAddress.addressId);
  };

  const addAddressShippingType = async () => {
    const result = await user.getUser();
    await user.addShippingType(result.body.version, newAddress.addressId);
    fetchUserData();
  };

  const removeAddressBillingType = async () => {
    const result = await user.getUser();
    await user.removeBillingTypeAddress(result.body.version, newAddress.addressId);
  };

  const removeAddressShippingType = async () => {
    const result = await user.getUser();
    await user.removeShippingTypeAddress(result.body.version, newAddress.addressId);
  };

  const setDefaultBillingAddress = async () => {
    const result = await user.getUser();
    await user.setDefaultBillingAddress(result.body.version, newAddress.addressId);
    fetchUserData();
  };

  const setDefaultShippingAddress = async () => {
    const result = await user.getUser();
    await user.setDefaultShippingAddress(result.body.version, newAddress.addressId);
    fetchUserData();
  };

  const handleSaveChanges = async () => {
    const isButtonDisabled =
      newAddress.country === '' ||
      newAddress.countryError !== '' ||
      newAddress.city === '' ||
      newAddress.cityError !== '' ||
      newAddress.street === '' ||
      newAddress.streetError !== '' ||
      newAddress.postalCode === '' ||
      newAddress.postalCodeError !== '';
    if (!isButtonDisabled && editIndex !== null) {
      try {
        await user.changeAddress(newAddress.version, newAddress.addressId, {
          country: 'US',
          city: newAddress.city,
          streetName: newAddress.street,
          postalCode: newAddress.postalCode,
        });
        if (newAddress.isBilling !== prevAddress.isBilling) {
          if (newAddress.isBilling) {
            await addAddressBillingType();
          } else {
            await removeAddressBillingType();
          }
        }

        if (newAddress.isShipping !== prevAddress.isShipping) {
          if (newAddress.isShipping) {
            await addAddressShippingType();
          } else {
            await removeAddressShippingType();
          }
        }

        if (newAddress.isDefaultBilling && !prevAddress.isDefaultBilling) {
          await setDefaultBillingAddress();
        }

        if (newAddress.isDefaultShipping && !prevAddress.isDefaultShipping) {
          await setDefaultShippingAddress();
        }
      } catch (error) {
        console.error('Error editing address:', error);
      }
      fetchUserData();
      setEditIndex(null);
      setEditMode(false);
    }
  };

  return (
    <>
      <table className="addresses-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Street</th>
            <th>Postode</th>
            <th>Type</th>
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
              disabled={newAddress.isDefaultBilling}
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
              disabled={newAddress.isDefaultShipping}
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
