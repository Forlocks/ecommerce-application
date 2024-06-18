import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { user } from '../../../..';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { ILoginForm } from './ILoginForm';
import { validateEmail, validatePassword } from '../../../non-visual/validators/validators';
import { EmailAndPasswordFields } from '../../fields/EmailAndPasswordFields/EmailAndPasswordFields';

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
        user.setUserState('true');
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
      <EmailAndPasswordFields
        email={state.email}
        emailError={state.emailError}
        onEmailChange={handleEmailChange}
        password={state.password}
        passwordError={state.passwordError}
        onPasswordChange={handlePasswordChange}
        showPassword={state.showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <div className="login-buttons">
        <LargeButton disabled={isButtonDisabled} disabledText="Login">
          Login
        </LargeButton>

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
