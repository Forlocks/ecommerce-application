export interface IRegistrationForm {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  showPassword: boolean;
  isDefaultShippingAddress: boolean;
  isSameAddresses: boolean;
  isDefaultBillingAddress: boolean;
}
