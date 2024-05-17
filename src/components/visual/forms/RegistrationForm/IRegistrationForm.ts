export interface IRegistrationForm {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  dateOfBirth: string;
  dateOfBirthError: string;
  showPassword: boolean;
  country: string;
  countryError: string;
  city: string;
  cityError: string;
  street: string;
  streetError: string;
  postCode: string;
  postCodeError: string;
  isDefaultShippingAddress: boolean;
  isSameAddresses: boolean;
  isDefaultBillingAddress: boolean;
}
