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
