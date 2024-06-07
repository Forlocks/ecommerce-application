import React from 'react';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { INameAndDateFieldProps } from './INameAndDateFields';
import { DateInput } from '../../inputs/DateInput/DateInput';

export const NameAndDateFields: React.FC<INameAndDateFieldProps> = ({
  firstName,
  firstNameError,
  onFirstNameChange,
  lastName,
  lastNameError,
  onLastNameChange,
  dateOfBirth,
  dateOfBirthError,
  onDateOfBirthChange,
  firstNameDisabled,
  lastNameDisabled,
  dateOfBirthDisabled,
  onEditFirstName,
  onEditLastName,
  editMode,
  onDateEdit,
}) => (
  <div className="name-date">
    <TextInput
      label="First Name"
      name="firstName"
      placeholder={'Enter your first name'}
      value={firstName}
      onChange={onFirstNameChange}
      error={firstNameError}
      disabled={firstNameDisabled}
      onEdit={onEditFirstName}
      editMode={editMode}
    />
    <TextInput
      label="Last Name"
      name="lastName"
      placeholder={'Enter your last name'}
      value={lastName}
      onChange={onLastNameChange}
      error={lastNameError}
      disabled={lastNameDisabled}
      onEdit={onEditLastName}
      editMode={editMode}
    />
    <DateInput
      label="Date of Birth"
      name="dayOfBirth"
      value={dateOfBirth}
      onChange={onDateOfBirthChange}
      error={dateOfBirthError}
      disabled={dateOfBirthDisabled}
      onEdit={onDateEdit}
      editMode={editMode}
    />
  </div>
);
