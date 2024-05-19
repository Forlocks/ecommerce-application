import React from 'react';
import { Logo } from '../../components/visual/logo/Logo';
import { RegistrationForm } from '../../components/visual/forms/RegistrationForm/RegistrationForm';
import './RegistrationPage.scss';

export const RegistrationPage: React.FC = function () {
  return (
    <div className="registration_page">
      <div className="registration_title">
        <Logo className="logo-main" />
        <h2>Please register</h2>
      </div>
      <div className="form_container">
        <RegistrationForm />
      </div>
      <div className="image-small">
        <img src="./assets/images/RegistrationPage_small.webp" alt="Small image" />
      </div>
    </div>
  );
};
