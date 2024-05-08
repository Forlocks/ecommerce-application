import React from "react";
import { ChangeEvent, Component, FormEvent } from "react";
import { EmailInput } from "../../inputs/EmailInput/EmailInput";
import { LoginFormState } from "./LoginFormInterface";

class LoginForm extends Component<object, LoginFormState> {
  state: LoginFormState = {
    email: '',
    emailError: '1111111', // Исходное значение для примера
  };

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value.trim();
    const emailError = this.validateEmail(newEmail);
    this.setState({
      email: newEmail,
      emailError: emailError
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <EmailInput
          label="Email Address"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          error={this.state.emailError}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default LoginForm;

