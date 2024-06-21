import {
  validateEmail,
  validatePassword,
  validateCountry,
  validateCity,
  validateStreet,
  validatePostCode,
  validateName,
  validateDateOfBirth,
  hasValidDecimalPlaces,
  isWithinRange,
  validatePromo,
} from './validators';

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('return error if email is empty', () => {
      expect(validateEmail('')).toBe('email cannot be empty');
    });

    it('return error if email does not contain "@"', () => {
      expect(validateEmail('testexample.com')).toBe('email must contain an "@" symbol');
    });

    it('return error if email format is invalid', () => {
      expect(validateEmail('test@com')).toBe('please enter a valid email address');
    });

    it('return empty string if email is valid', () => {
      expect(validateEmail('test@example.com')).toBe('');
    });
  });

  describe('validatePassword', () => {
    it('return error if password is empty', () => {
      expect(validatePassword('')).toBe('password cannot be empty');
    });

    it('return error if password is less than 8 characters', () => {
      expect(validatePassword('Pass1')).toBe('password must be at least 8 characters long');
    });

    it('return error if password does not contain uppercase letter', () => {
      expect(validatePassword('password1')).toBe(
        'password must contain at least one uppercase letter (A-Z)',
      );
    });

    it('return error if password does not contain lowercase letter', () => {
      expect(validatePassword('PASSWORD1')).toBe(
        'password must contain at least one lowercase letter (a-z)',
      );
    });

    it('return error if password does not contain a digit', () => {
      expect(validatePassword('Password')).toBe('password must contain at least one digit (0-9)');
    });

    it('return empty string if password is valid', () => {
      expect(validatePassword('Password1')).toBe('');
    });
  });

  describe('validateCountry', () => {
    it('return error if country is empty', () => {
      expect(validateCountry('')).toBe('country cannot be empty');
    });

    it('return error if country is not United States', () => {
      expect(validateCountry('Canada')).toBe('country must be from the autocomplete field list');
    });

    it('return empty string if country is United States', () => {
      expect(validateCountry('United States')).toBe('');
    });
  });

  describe('validateCity', () => {
    it('return error if city is empty', () => {
      expect(validateCity('')).toBe('city cannot be empty');
    });

    it('return error if city contains special characters or numbers', () => {
      expect(validateCity('City123')).toBe('city must not contain special characters or numbers');
    });

    it('return empty string if city is valid', () => {
      expect(validateCity('New York')).toBe('');
    });
  });

  describe('validateStreet', () => {
    it('return error if street is empty', () => {
      expect(validateStreet('')).toBe('street cannot be empty');
    });

    it('return empty string if street is valid', () => {
      expect(validateStreet('123 Main St')).toBe('');
    });
  });

  describe('validatePostCode', () => {
    it('return error if post code is empty', () => {
      expect(validatePostCode('')).toBe('post code cannot be empty');
    });

    it('return error if post code format is invalid', () => {
      expect(validatePostCode('1234')).toBe('format XXXXX or XXXXX-YYYY');
    });

    it('return empty string if post code is valid', () => {
      expect(validatePostCode('12345')).toBe('');
      expect(validatePostCode('12345-6789')).toBe('');
    });
  });

  describe('validateName', () => {
    it('return error if name is empty', () => {
      expect(validateName('')).toBe('this field cannot be empty');
    });

    it('return error if name contains special characters or numbers', () => {
      expect(validateName('Name123')).toBe('field must not contain special characters or numbers');
    });

    it('return empty string if name is valid', () => {
      expect(validateName('John Doe')).toBe('');
    });
  });

  describe('validateDateOfBirth', () => {
    it('return error if date of birth is empty', () => {
      expect(validateDateOfBirth('')).toBe('date of birth cannot be empty');
    });

    it('return error if user is under 13 years old', () => {
      const today = new Date();
      const lessThan13YearsOld = `${today.getFullYear() - 12}-01-01`;
      expect(validateDateOfBirth(lessThan13YearsOld)).toBe('you must be 13 years old or older');
    });

    it('return empty string if user is 13 years old or older', () => {
      const today = new Date();
      const atLeast13YearsOld = `${today.getFullYear() - 13}-01-01`;
      expect(validateDateOfBirth(atLeast13YearsOld)).toBe('');
    });
  });

  describe('hasValidDecimalPlaces', () => {
    it('return true if value has valid decimal places', () => {
      expect(hasValidDecimalPlaces('123.45', 2)).toBe(true);
      expect(hasValidDecimalPlaces('123', 2)).toBe(true);
    });

    it('return false if value has invalid decimal places', () => {
      expect(hasValidDecimalPlaces('123.456', 2)).toBe(false);
    });
  });

  describe('isWithinRange', () => {
    it('return true if value is within range', () => {
      expect(isWithinRange('5', 0, 10)).toBe(true);
    });

    it('return false if value is out of range', () => {
      expect(isWithinRange('15', 0, 10)).toBe(false);
    });
  });

  describe('validatePromo', () => {
    it('return error if promo code is invalid', () => {
      expect(validatePromo('INVALID', [])).toBe('invalid promocode');
    });

    it('return error if promo code is already applied', () => {
      expect(validatePromo('DISCOUNT10', ['DISCOUNT10'])).toBe('already applied');
    });

    it('return error if there is already an active promo code', () => {
      expect(validatePromo('DISCOUNT10', ['DISCOUNT35'])).toBe(
        'one promo code can be applied at a time',
      );
    });

    it('return empty string if promo code is valid and not yet applied', () => {
      expect(validatePromo('DISCOUNT10', [])).toBe('');
      expect(validatePromo('DISCOUNT35', [])).toBe('');
    });
  });
});
