import React, { ChangeEvent, Component, FormEvent } from 'react';
import { EmailInput } from '../../inputs/EmailInput/EmailInput';
import { LoginFormState } from './LoginFormInterface';
import { PasswordInput } from '../../inputs/PasswordInput/PasswordInput';

class LoginForm extends Component<object, LoginFormState> {
  state: LoginFormState = {
    email: '',
    emailError: '',
    password: '',
    passwordError: 'ddjjdjd',
  };

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value.trim();
    const emailError = this.validateEmail(newEmail);
    this.setState({
      email: newEmail,
      emailError,
    });
  };

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = event.target.value.trim();
    const passwordError = this.validatePassword(newPassword);
    this.setState({
      password: newPassword,
      passwordError,
    });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  validateEmail = (email: string): string => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return 'email cannot be empty';
    }
    if (!trimmedEmail.includes('@')) {
      return 'email must contain an "@" symbol';
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      return 'email must include a domain name (e.g., example.com)';
    }
    return '';
  };

  validatePassword = (password: string): string => {
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <EmailInput
          label="Email"
          name="email"
          placeholder='Enter your email'
          value={this.state.email}
          onChange={this.handleEmailChange}
          error={this.state.emailError}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder='Enter your password'
          value={this.state.password}
          onChange={this.handlePasswordChange}
          error={this.state.passwordError}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default LoginForm;
