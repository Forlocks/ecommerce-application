import React from 'react';
import { IUserAddresses } from './IUserAddresses';
import { user } from '../../../..';

export const UserAddresses: React.FC<IUserAddresses> = ({
  addresses,
  updateAddresses,
  fetchUserData,
}) => {
  function handleEdit(index: number) {
    console.log(`Edit row ${index}`);
  }

  async function handleDelete(id: string, version: number) {
    try {
      await user.removeUserAddress(version, id);
      const updatedAddresses = addresses.filter((address) => address.id !== id);
      updateAddresses(updatedAddresses);
      await fetchUserData();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  }

  return (
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
            <tr key={index}>
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
                    src="./assets/images/Edit-Icon.png"
                    alt="edit"
                    style={{ opacity: 0.6, cursor: 'pointer' }}
                  ></img>
                </div>
              </td>
              <td>
                <div onClick={() => handleDelete(row.id, row.version)}>
                  <img
                    width={16}
                    src="./assets/images/Delete-Icon.webp"
                    alt="edit"
                    style={{ opacity: 0.6, cursor: 'pointer' }}
                  ></img>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
