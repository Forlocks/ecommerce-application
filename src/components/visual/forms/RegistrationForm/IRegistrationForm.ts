import { IUserAddress } from '../ProfileForm/IUserAddresses';

export interface IRegistrationForm {
  prefix?: string;
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
  countryBilling: string;
  countryErrorBilling: string;
  cityBilling: string;
  cityErrorBilling: string;
  streetBilling: string;
  streetErrorBilling: string;
  postCodeBilling: string;
  postCodeErrorBilling: string;
  isDefaultShippingAddress: boolean;
  isSameAddresses: boolean;
  isDefaultBillingAddress: boolean;
  addresses?: IUserAddress[];
  version?: number;
  firstNameDisabled?: boolean;
  lastNameDisabled?: boolean;
  emailDisabled?: boolean;
  editMode?: boolean;
  dateDisabled?: boolean;
  passwordDisabled?: boolean;
  newPassword?: string;
  oldPassword?: string;
  newPasswordError?: string;
}
