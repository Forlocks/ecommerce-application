import { ChangeEvent } from 'react';

export interface INameAndDateFieldProps {
  firstName: string;
  firstNameError: string;
  onFirstNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  lastName: string;
  lastNameError: string;
  onLastNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  dateOfBirth: string;
  dateOfBirthError: string;
  onDateOfBirthChange: (event: ChangeEvent<HTMLInputElement>) => void;
  firstNameDisabled?: boolean;
  lastNameDisabled?: boolean;
  dateOfBirthDisabled?: boolean;
  onEditFirstName?: () => void;
  onEditLastName?: () => void;
  editMode?: boolean;
  dateDisabled?: boolean;
  onDateEdit?: () => void;
}
