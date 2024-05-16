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
