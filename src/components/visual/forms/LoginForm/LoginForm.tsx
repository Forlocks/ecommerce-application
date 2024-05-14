import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { user } from '../../../..';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { EmailInput } from '../../inputs/EmailInput/EmailInput';
import { PasswordInput } from '../../inputs/PasswordInput/PasswordInput';
import { ILoginForm } from './ILoginForm';
import { validateEmail, validatePassword } from '../../../non-visual/validators/validators';

export const LoginForm: React.FC = () => {
  const [state, setState] = useState<ILoginForm>({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    showPassword: false,
  });

  const navigate = useNavigate();

  const isButtonDisabled =
    state.email === '' ||
    state.password === '' ||
    state.emailError !== '' ||
    state.passwordError !== '';

  const togglePasswordVisibility = () => {
    setState((prevState) => ({ ...prevState, showPassword: !prevState.showPassword }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value.trim();
    const emailError = validateEmail(newEmail);
    setState((prevState) => ({ ...prevState, email: newEmail, emailError }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = event.target.value.trim();
    const passwordError = validatePassword(newPassword);
    setState((prevState) => ({ ...prevState, password: newPassword, passwordError }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password } = state;

    const userData = {
      email,
      password,
    };

    user.login(userData).then((result) => {
      if (result.email === 'ok' && result.password === 'ok') {
        navigate('/');
      } else {
        setState((prevState) => ({
          ...prevState,
          emailError: result.email === 'ok' ? '' : result.email,
          passwordError: result.password === 'ok' ? '' : result.password,
        }));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <EmailInput
        label="Email"
        name="email"
        placeholder="Enter your email"
        value={state.email}
        onChange={handleEmailChange}
        error={state.emailError}
      />
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter your password"
        value={state.password}
        onChange={handlePasswordChange}
        showPassword={state.showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        error={state.passwordError}
      />
      <div className="login-buttons">
        <LargeButton disabled={isButtonDisabled}>Login</LargeButton>

        <div className="link">
          <span>
            Don't have an account?&nbsp;
            <NavLink to="/registration">Register now</NavLink>
          </span>
        </div>
      </div>
    </form>
  );
};
