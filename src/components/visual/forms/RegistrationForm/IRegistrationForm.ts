export interface IRegistrationForm {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
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
