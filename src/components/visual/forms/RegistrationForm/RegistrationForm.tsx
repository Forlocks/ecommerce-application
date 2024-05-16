import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { user } from '../../../..';
import {
  validateDateOfBirth,
  validateEmail,
  validateName,
  validatePassword,
} from '../../../non-visual/validators/validators';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { EmailAndPasswordFields } from '../../fields/EmailAndPasswordFields/EmailAndPasswordFields';
import { Checkbox } from '../../checkbox/Checkbox';
import { IRegistrationForm } from './IRegistrationForm';
import { NameAndDateFields } from '../../fields/NameAndDateFields/NameAndDateFields';

export const RegistrationForm: React.FC = () => {
  const [state, setState] = useState<IRegistrationForm>({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    showPassword: false,
    firstName: '',
    firstNameError: '',
    lastName: '',
    dateOfBirth: '',
    dateOfBirthError: '',
    lastNameError: '',
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

      <span>Provide Your Name and Date of Birth</span>
      <div className="fields-container">
        <NameAndDateFields
          firstName={state.firstName}
          firstNameError={state.firstNameError}
          onFirstNameChange={handleFirstNameChange}
          lastName={state.lastName}
          lastNameError={state.lastNameError}
          onLastNameChange={handleLastNameChange}
          dateOfBirth={state.dateOfBirth}
          dateOfBirthError={state.dateOfBirthError}
          onDateOfBirthChange={handleDateOfBirth}
        />
      </div>

      <Checkbox
        id="default-shiping-address"
        checked={state.isDefaultShippingAddress}
        onChange={handleCheckboxChangeDefaultShippingAddress}
        label="set as default shipping address"
      />

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
