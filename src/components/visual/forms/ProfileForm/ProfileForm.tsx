import React, { useState, ChangeEvent, useEffect } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { user } from '../../../..';
import {
  validateEmail,
  validatePassword,
  validateDateOfBirth,
  validateName,
  validateCountry,
  validateCity,
  validateStreet,
  validatePostCode,
} from '../../../non-visual/validators/validators';
import { EmailAndPasswordFields } from '../../fields/EmailAndPasswordFields/EmailAndPasswordFields';
import { AdressFields } from '../../fields/AdressFields/AdressFields';
import { Checkbox } from '../../checkbox/Checkbox';
import { NameAndDateFields } from '../../fields/NameAndDateFields/NameAndDateFields';
import { IRegistrationForm } from '../RegistrationForm/IRegistrationForm';
import { UserAddresses } from './UserAddresses';
import './ProfileForm.scss';
import { IUserAddress } from './IUserAddresses';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';

export const ProfileForm: React.FC = () => {
  const [state, setState] = useState<IRegistrationForm>({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    showPassword: false,
    country: '',
    countryError: '',
    city: '',
    cityError: '',
    street: '',
    streetError: '',
    postCode: '',
    postCodeError: '',
    countryBilling: '',
    countryErrorBilling: '',
    cityBilling: '',
    cityErrorBilling: '',
    streetBilling: '',
    streetErrorBilling: '',
    postCodeBilling: '',
    postCodeErrorBilling: '',
    firstName: '',
    firstNameError: '',
    dateOfBirth: '',
    dateOfBirthError: '',
    lastName: '',
    lastNameError: '',
    isDefaultShippingAddress: false,
    isSameAddresses: false,
    isDefaultBillingAddress: false,
    addresses: [],
    version: 0,
    firstNameDisabled: true,
    lastNameDisabled: true,
    emailDisabled: true,
    editMode: true,
    dateDisabled: true,
    passwordDisabled: true,
    newPassword: '',
    oldPassword: '',
    newPasswordError: '',
    showNewPassword: false,
    isBilling: false,
    isShipping: false,
  });

  const [showAddressForm, setShowAddressForm] = useState(false);

  const fillAddresses = (userObj: Customer) => {
    const updatedAddresses: IUserAddress[] = userObj.addresses.map((address) => ({
      country: address.country,
      city: address.city || '',
      street: address.streetName || '',
      postalCode: address.postalCode || '',
      isBilling: userObj.billingAddressIds?.includes(address.id as string) || false,
      isShipping: userObj.shippingAddressIds?.includes(address.id as string) || false,
      isDefaultBilling: address.id === userObj.defaultBillingAddressId || false,
      isDefaultShipping: address.id === userObj.defaultShippingAddressId || false,
      id: address.id || '',
      version: userObj.version,
    }));

    setState((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));
  };

  const fetchUserData = async () => {
    try {
      const result = await user.getUser();
      fillAddresses(result.body);

      console.log(result.body);
      setState((prevState) => ({
        ...prevState,
        email: result.body.email,
        firstName: result.body.firstName as string,
        lastName: result.body.lastName as string,
        dateOfBirth: result.body.dateOfBirth as string,
        version: result.body.version,
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // const navigate = useNavigate();

  const updateAddresses = (updatedAddresses: IUserAddress[]) => {
    setState((prevState) => ({
      ...prevState,
      addresses: updatedAddresses,
    }));
  };

  // const isButtonDisabled =
  //   state.email === '' ||
  //   state.password === '' ||
  //   state.emailError !== '' ||
  //   state.passwordError !== '' ||
  //   state.country === '' ||
  //   state.countryError !== '' ||
  //   state.city === '' ||
  //   state.cityError !== '' ||
  //   state.street === '' ||
  //   state.streetError !== '' ||
  //   state.postCode === '' ||
  //   state.postCodeError !== '' ||
  //   state.firstName === '' ||
  //   state.firstNameError !== '' ||
  //   state.lastName === '' ||
  //   state.lastNameError !== '' ||
  //   state.dateOfBirth === '' ||
  //   state.dateOfBirthError !== '' ||
  //   state.countryBilling === '' ||
  //   state.countryErrorBilling !== '' ||
  //   state.cityBilling === '' ||
  //   state.cityErrorBilling !== '' ||
  //   state.streetBilling === '' ||
  //   state.streetErrorBilling !== '' ||
  //   state.postCodeBilling === '' ||
  //   state.postCodeErrorBilling !== '';

  const onEditFirstName = async () => {
    setState((prevState) => ({ ...prevState, firstNameDisabled: !prevState.firstNameDisabled }));
    if (!state.firstNameDisabled) {
      await user.updateUserFirstName(state.version as number, state.firstName);
      fetchUserData();
    }
  };

  const onEditLastName = async () => {
    setState((prevState) => ({ ...prevState, lastNameDisabled: !prevState.lastNameDisabled }));
    if (!state.lastNameDisabled) {
      await user.updateUserLastName(state.version as number, state.lastName);
      fetchUserData();
    }
  };

  const onEditEmail = async () => {
    setState((prevState) => ({ ...prevState, emailDisabled: !prevState.emailDisabled }));
    if (!state.emailDisabled) {
      await user.updateUserEmail(state.version as number, state.email);
      fetchUserData();
    }
  };

  const onEditDate = async () => {
    setState((prevState) => ({ ...prevState, dateDisabled: !prevState.dateDisabled }));
    if (!state.dateDisabled) {
      await user.updateUserDateOfBirth(state.version as number, state.dateOfBirth);
      fetchUserData();
    }
  };

  const onEditPassword = async () => {
    setState((prevState) => ({ ...prevState, passwordDisabled: !prevState.passwordDisabled }));
    if (!state.passwordDisabled) {
      await user.updateUserPassword(
        state.version as number,
        state.oldPassword as string,
        state.newPassword as string,
      );
      user.logout();
      await user.login({
        email: state.email,
        password: state.newPassword as string,
      });
      user.setUserState('true');
    }
  };

  const togglePasswordVisibility = () => {
    setState((prevState) => ({ ...prevState, showPassword: !prevState.showPassword }));
  };

  const toggleNewPasswordVisibility = () => {
    setState((prevState) => ({ ...prevState, showNewPassword: !prevState.showNewPassword }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value.trim();
    const emailError = validateEmail(newEmail);
    setState((prevState) => ({ ...prevState, email: newEmail, emailError }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = event.target.value.trim();
    const passwordError = validatePassword(newPassword);
    setState((prevState) => ({
      ...prevState,
      password: newPassword,
      passwordError,
    }));
  };

  const handleOldPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const oldPassword = event.target.value.trim();
    const passwordError = validatePassword(oldPassword);
    setState((prevState) => ({ ...prevState, oldPassword, passwordError }));
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = event.target.value.trim();
    const newPasswordError = validatePassword(newPassword);
    setState((prevState) => ({ ...prevState, newPassword, newPasswordError }));
  };

  // ---------------------------------------------------------

  const handleCountryChange = (
    event: ChangeEvent<HTMLInputElement>,
    targetCountry: string,
    targetCountryError: string,
  ): void => {
    const newCountry = event.target.value;
    const countryError = validateCountry(newCountry);
    setState((prevState) => ({
      ...prevState,
      [targetCountry]: newCountry,
      [targetCountryError]: countryError,
    }));
  };

  const handleCityChange = (
    event: ChangeEvent<HTMLInputElement>,
    targetCity: string,
    targetCityError: string,
  ): void => {
    const newCity = event.target.value;
    const cityError = validateCity(newCity);
    setState((prevState) => ({
      ...prevState,
      [targetCity]: newCity,
      [targetCityError]: cityError,
    }));
  };

  const handleStreetChange = (
    event: ChangeEvent<HTMLInputElement>,
    targetStreet: string,
    targetStreetError: string,
  ): void => {
    const newStreet = event.target.value;
    const streetError = validateStreet(newStreet);
    setState((prevState) => ({
      ...prevState,
      [targetStreet]: newStreet,
      [targetStreetError]: streetError,
    }));
  };

  const handlePostCodeChange = (
    event: ChangeEvent<HTMLInputElement>,
    targetPostCode: string,
    targetPostCodeError: string,
  ): void => {
    const newPostCode = event.target.value;
    const postCodeError = validatePostCode(newPostCode);
    setState((prevState) => ({
      ...prevState,
      [targetPostCode]: newPostCode,
      [targetPostCodeError]: postCodeError,
    }));
  };

  // -----------------------------------------------------------

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newFirstName = event.target.value.trim();
    const firstNameError = validateName(newFirstName);
    setState((prevState) => ({ ...prevState, firstName: newFirstName, firstNameError }));
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLastName = event.target.value.trim();
    const lastNameError = validateName(newLastName);
    setState((prevState) => ({ ...prevState, lastName: newLastName, lastNameError }));
  };

  const handleDateOfBirth = (event: ChangeEvent<HTMLInputElement>): void => {
    const newDateOfBirth = event.target.value;
    const dateOfBirthError = validateDateOfBirth(newDateOfBirth);
    setState((prevState) => ({
      ...prevState,
      dateOfBirth: newDateOfBirth,
      dateOfBirthError,
    }));
  };

  // ---------------------------------------------------------------------------
  const handleCheckboxChangeBillingAddress = (checked: boolean) => {
    setState({
      ...state,
      isBilling: checked,
    });
  };

  const handleCheckboxChangeShippingAddress = (checked: boolean) => {
    setState({
      ...state,
      isShipping: checked,
    });
  };

  const handleCheckboxChangeDefaultShippingAddress = (checked: boolean) => {
    setState({
      ...state,
      isDefaultShippingAddress: checked,
    });
  };

  const handleCheckboxChangeDefaultBillingAddress = (checked: boolean) => {
    setState({
      ...state,
      isDefaultBillingAddress: checked,
    });
  };

  // const handleCheckboxChangeSameAddresses = (checked: boolean) => {
  //   setState((prevState) => {
  //     if (checked) {
  //       return {
  //         ...prevState,
  //         isSameAddresses: checked,
  //         countryBilling: prevState.country,
  //         countryErrorBilling: prevState.countryError,
  //         cityBilling: prevState.city,
  //         cityErrorBilling: prevState.cityError,
  //         streetBilling: prevState.street,
  //         streetErrorBilling: prevState.streetError,
  //         postCodeBilling: prevState.postCode,
  //         postCodeErrorBilling: prevState.postCodeError,
  //       };
  //     }
  //     return {
  //       ...prevState,
  //       isSameAddresses: checked,
  //       countryBilling: '',
  //       countryErrorBilling: '',
  //       cityBilling: '',
  //       cityErrorBilling: '',
  //       streetBilling: '',
  //       streetErrorBilling: '',
  //       postCodeBilling: '',
  //       postCodeErrorBilling: '',
  //     };
  //   });
  // };

  // const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   const {
  //     email,
  //     password,
  //     city,
  //     street,
  //     postCode,
  //     firstName,
  //     lastName,
  //     dateOfBirth,
  //     cityBilling,
  //     streetBilling,
  //     postCodeBilling,
  //     isDefaultShippingAddress,
  //     isSameAddresses,
  //     isDefaultBillingAddress,
  //   } = state;

  //   const userData = {
  //     email,
  //     firstName,
  //     lastName,
  //     password,
  //     dateOfBirth,
  //     addresses: [
  //       {
  //         country: 'US',
  //         city,
  //         streetName: street,
  //         postalCode: postCode,
  //       },
  //       {
  //         country: 'US',
  //         city: cityBilling,
  //         streetName: streetBilling,
  //         postalCode: postCodeBilling,
  //       },
  //     ],
  //     shippingAddresses: [0],
  //     billingAddresses: isSameAddresses ? [0] : [1],
  //     defaultShippingAddress: isDefaultShippingAddress ? 0 : undefined,
  //     defaultBillingAddress: isDefaultBillingAddress ? (isSameAddresses ? 0 : 1) : undefined,
  //   };

  //   if (isSameAddresses) userData.addresses.pop();

  //   user.registration(userData).then((result) => {
  //     if (result.email === 'ok') {
  //       user.setUserState('true');
  //       //   navigate('/');
  //       alert('Registration completed successfully!');
  //     } else {
  //       setState((prevState) => ({
  //         ...prevState,
  //         emailError: result.email === 'ok' ? '' : result.email,
  //       }));
  //     }
  //   });
  // };

  // -----------------------------------------------------------------------------

  const addAddressBillingType = async () => {
    const result = await user.getUser();
    await user.addBillingType(
      result.body.version,
      result.body.addresses[result.body.addresses.length - 1].id as string,
    );
    fetchUserData();
  };

  const addAddressShippingType = async () => {
    const result = await user.getUser();
    await user.addShippingType(
      result.body.version,
      result.body.addresses[result.body.addresses.length - 1].id as string,
    );
    fetchUserData();
  };

  const setDefaultBillingAddress = async () => {
    const result = await user.getUser();
    await user.setDefaultBillingAddress(
      result.body.version,
      result.body.addresses[result.body.addresses.length - 1].id as string,
    );
    fetchUserData();
  };

  const setDefaultShippingAddress = async () => {
    const result = await user.getUser();
    await user.setDefaultShippingAddress(
      result.body.version,
      result.body.addresses[result.body.addresses.length - 1].id as string,
    );
    fetchUserData();
  };

  const handleAddNewAddress = async () => {
    setShowAddressForm(true);
    if (showAddressForm) {
      try {
        await user.addAddress(state.version as number, {
          country: 'US',
          city: state.city,
          streetName: state.street,
          postalCode: state.postCode,
        });
        if (state.isBilling) await addAddressBillingType();
        if (state.isShipping) await addAddressShippingType();
        if (state.isDefaultBillingAddress) await setDefaultBillingAddress();
        if (state.isDefaultShippingAddress) await setDefaultShippingAddress();
        if (
          !state.isBilling &&
          !state.isShipping &&
          !state.isDefaultBillingAddress &&
          !state.isDefaultShippingAddress
        ) {
          fetchUserData();
        }
      } catch (error) {
        console.error('Error adding new address:', error);
      }
      setShowAddressForm(false);
    }
  };

  return (
    <div className="registration-form">
      <div className="user-container">
        <span>
          Welcome to your profile page! This is where you can view and manage all your personal
          information. Make sure your information is always up-to-date.
        </span>
        <span>Your Email and Password</span>
        <div className="fields-container">
          <EmailAndPasswordFields
            email={state.email}
            emailError={state.emailError}
            onEmailChange={handleEmailChange}
            password={state.password}
            passwordError={state.passwordError}
            onPasswordChange={handlePasswordChange}
            showPassword={state.showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            emailDisabled={state.emailDisabled}
            passwordDisabled={state.passwordDisabled}
            passwordPlaceholder="********"
            editMode={state.editMode}
            onEditEmail={onEditEmail}
            onEditPassword={onEditPassword}
            onOldPasswordChange={handleOldPasswordChange as () => void}
            onNewPasswordChange={handleNewPasswordChange as () => void}
            newPasswordError={state.newPasswordError}
            showNewPassword={state.showNewPassword}
            toggleNewPasswordVisibility={toggleNewPasswordVisibility}
          />
        </div>

        <span>Your Name and Date of Birth</span>
        <div className="fields-container">
          <NameAndDateFields
            firstName={state.firstName}
            firstNameError={state.firstNameError}
            onFirstNameChange={handleFirstNameChange}
            lastName={state.lastName}
            lastNameError={state.lastNameError}
            onLastNameChange={handleLastNameChange}
            firstNameDisabled={state.firstNameDisabled}
            lastNameDisabled={state.lastNameDisabled}
            dateOfBirth={state.dateOfBirth}
            dateOfBirthError={state.dateOfBirthError}
            onDateOfBirthChange={handleDateOfBirth}
            dateOfBirthDisabled={state.dateDisabled}
            onEditFirstName={onEditFirstName}
            onEditLastName={onEditLastName}
            editMode={state.editMode}
            onDateEdit={onEditDate}
          />
        </div>
      </div>
      <div className="adress-container">
        <span>Addresses</span>
        <UserAddresses
          addresses={state.addresses as IUserAddress[]}
          updateAddresses={updateAddresses}
          fetchUserData={fetchUserData}
        />

        {showAddressForm && (
          <>
            <div className="fields-container">
              <AdressFields
                prefix="shipping"
                country={state.country}
                countryError={state.countryError}
                onCountryChange={(event) => handleCountryChange(event, 'country', 'countryError')}
                city={state.city}
                cityError={state.cityError}
                onCityChange={(event) => handleCityChange(event, 'city', 'cityError')}
                street={state.street}
                streetError={state.streetError}
                onStreetChange={(event) => handleStreetChange(event, 'street', 'streetError')}
                postCode={state.postCode}
                postCodeError={state.postCodeError}
                onPostCodeChange={(event) => {
                  handlePostCodeChange(event, 'postCode', 'postCodeError');
                }}
              />
              <Checkbox
                id="billing-address"
                checked={state.isBilling}
                onChange={handleCheckboxChangeBillingAddress}
                label="set as billing address"
              />
              <Checkbox
                id="shipping-address"
                checked={state.isShipping}
                onChange={handleCheckboxChangeShippingAddress}
                label="set as shipping billing"
              />
              <Checkbox
                id="default-billing-address"
                checked={state.isDefaultBillingAddress}
                onChange={handleCheckboxChangeDefaultBillingAddress}
                label="set as default billing address"
              />
              <Checkbox
                id="default-shipping-address"
                checked={state.isDefaultShippingAddress}
                onChange={handleCheckboxChangeDefaultShippingAddress}
                label="set as default shipping address"
              />
            </div>
          </>
        )}
        <MediumButton onClick={handleAddNewAddress} children={<div>Add new address</div>} />
      </div>
    </div>
  );
};
