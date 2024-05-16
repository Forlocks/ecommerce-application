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
  isDefaultShippingAddress: boolean;
  isSameAddresses: boolean;
  isDefaultBillingAddress: boolean;
}
