import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { user } from '../../../..';
import {
  validateEmail,
  validatePassword,
  validateCountry,
  validateCity,
  validateStreet,
  validatePostCode,
} from '../../../non-visual/validators/validators';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { EmailAndPasswordFields } from '../../fields/EmailAndPasswordFields/EmailAndPasswordFields';
import { AdressFields } from '../../fields/AdressFields/AdressFields';
import { Checkbox } from '../../checkbox/Checkbox';
import { IRegistrationForm } from './IRegistrationForm';

export const RegistrationForm: React.FC = () => {
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
    isDefaultShippingAddress: false,
    isSameAddresses: false,
    isDefaultBillingAddress: false,
  });

  const navigate = useNavigate();

  const isButtonDisabled =
    state.email === '' ||
    state.password === '' ||
    state.emailError !== '' ||
    state.passwordError !== '';

  const togglePasswordVisibility = () => {
    setState((prevState) => ({ ...prevState, showPassword: !prevState.showPassword }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value.trim();
    const emailError = validateEmail(newEmail);
    setState((prevState) => ({ ...prevState, email: newEmail, emailError }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = event.target.value.trim();
    const passwordError = validatePassword(newPassword);
    setState((prevState) => ({ ...prevState, password: newPassword, passwordError }));
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newCountry = event.target.value;
    const countryError = validateCountry(newCountry);
    setState((prevState) => ({ ...prevState, country: newCountry, countryError }));
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newCity = event.target.value;
    const cityError = validateCity(newCity);
    setState((prevState) => ({ ...prevState, city: newCity, cityError }));
  };

  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newStreet = event.target.value;
    const streetError = validateStreet(newStreet);
    setState((prevState) => ({ ...prevState, street: newStreet, streetError }));
  };

  const handlePostCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPostCode = event.target.value;
    const postCodeError = validatePostCode(newPostCode);
    setState((prevState) => ({ ...prevState, postCode: newPostCode, postCodeError }));
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

  const handleCheckboxChangeSameAddresses = (checked: boolean) => {
    setState({
      ...state,
      isSameAddresses: checked,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password } = state;

    const userData = {
      email,
      password,
    };

    user.login(userData).then((result) => {
      if (result.email === 'ok' && result.password === 'ok') {
        navigate('/');
      } else {
        setState((prevState) => ({
          ...prevState,
          emailError: result.email === 'ok' ? '' : result.email,
          passwordError: result.password === 'ok' ? '' : result.password,
        }));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <span>Enter Your Email and Password</span>
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
        />
      </div>

      <span>Shipping adress</span>
      <div className="fields-container">
        <AdressFields
          country={state.country}
          countryError={state.countryError}
          onCountryChange={handleCountryChange}
          city={state.city}
          cityError={state.cityError}
          onCityChange={handleCityChange}
          street={state.street}
          streetError={state.streetError}
          onStreetChange={handleStreetChange}
          postCode={state.postCode}
          postCodeError={state.postCodeError}
          onPostCodeChange={handlePostCodeChange}
        />
      </div>

      <Checkbox
        id="default-shiping-address"
        checked={state.isDefaultShippingAddress}
        onChange={handleCheckboxChangeDefaultShippingAddress}
        label="set as default shipping address"
      />

      <span>Billing adress</span>
      <div className="fields-container">
        <AdressFields
          country={state.country}
          countryError={state.countryError}
          onCountryChange={handleCountryChange}
          city={state.city}
          cityError={state.cityError}
          onCityChange={handleCityChange}
          street={state.street}
          streetError={state.streetError}
          onStreetChange={handleStreetChange}
          postCode={state.postCode}
          postCodeError={state.postCodeError}
          onPostCodeChange={handlePostCodeChange}
        />
      </div>

      <Checkbox
        id="same-address"
        checked={state.isSameAddresses}
        onChange={handleCheckboxChangeSameAddresses}
        label="shipping and billing addresses coincide"
      />

      <Checkbox
        id="default-billing-address"
        checked={state.isDefaultBillingAddress}
        onChange={handleCheckboxChangeDefaultBillingAddress}
        label="set as default billing address"
      />

      <div className="login-buttons">
        <LargeButton disabled={isButtonDisabled}>Register</LargeButton>

        <div className="link">
          <span>
            Already have an account?&nbsp;
            <NavLink to="/login">Log in</NavLink>
          </span>
        </div>
      </div>
    </form>
  );
};
