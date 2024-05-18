export const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return 'email cannot be empty';
  }
  if (!trimmedEmail.includes('@')) {
    return 'email must contain an "@" symbol';
  }
  if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
    return 'please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  const trimmedPassword = password.trim();
  if (!trimmedPassword) {
    return 'password cannot be empty';
  }
  if (trimmedPassword.length < 8) {
    return 'password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(trimmedPassword)) {
    return 'password must contain at least one uppercase letter (A-Z)';
  }
  if (!/[a-z]/.test(trimmedPassword)) {
    return 'password must contain at least one lowercase letter (a-z)';
  }
  if (!/[0-9]/.test(trimmedPassword)) {
    return 'password must contain at least one digit (0-9)';
  }
  return '';
};

export const validateCountry = (country: string): string => {
  const trimmedCountry = country.trim();
  if (!trimmedCountry) return 'country cannot be empty';

  if (trimmedCountry !== 'United States') {
    return 'country must be from the autocomplete field list';
  }

  return '';
};

export const validateCity = (city: string): string => {
  const trimmedCity = city.trim();
  if (!trimmedCity) return 'city cannot be empty';

  if (!/^[A-Za-z\s]*$/.test(trimmedCity)) {
    return 'city must not contain special characters or numbers';
  }

  return '';
};

export const validateStreet = (street: string): string => {
  const trimmedStreet = street.trim();
  if (!trimmedStreet) return 'street cannot be empty';

  return '';
};

export const validatePostCode = (postCode: string): string => {
  const trimmedPostCode = postCode.trim();
  if (!trimmedPostCode) return 'post code cannot be empty';

  if (!/^\d{5}(-\d{4})?$/.test(trimmedPostCode)) {
    return 'United States post code must be in the numeric format XXXXX or XXXXX-YYYY';
  }

  return '';
};

export const validateName = (name: string): string => {
  const trimmedName = name.trim();
  if (!trimmedName) return 'this field cannot be empty';
  if (!/^[A-Za-z\s]*$/.test(trimmedName)) {
    return 'this field must not contain special characters or numbers';
  }
  return '';
};

export const validateDateOfBirth = (date: string): string => {
  if (!date) return 'date of birth cannot be empty';
  const dateOfBirthString = date;
  const dateOfBirthObj = new Date(dateOfBirthString);
  const todayDate = new Date();
  let age = todayDate.getFullYear() - dateOfBirthObj.getFullYear();
  if (
    todayDate.getMonth() < dateOfBirthObj.getMonth() ||
    (todayDate.getMonth() === dateOfBirthObj.getMonth() &&
      todayDate.getDate() < dateOfBirthObj.getDate())
  ) {
    age--;
  }
  if (age < 13) return 'You must be 13 years old or older';

  return '';
};
