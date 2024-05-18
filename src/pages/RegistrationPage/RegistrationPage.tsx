import React from 'react';
import { Logo } from '../../components/visual/logo/Logo';
import { RegistrationForm } from '../../components/visual/forms/RegistrationForm/RegistrationForm';

export const RegistrationPage: React.FC = function () {
  return (
    <div className="login_page">
      <div className="content_container">
        <Logo className="logo-main" />
        <h2>Please register</h2>
        <span>
          Welcome to our boutique of elegance, where unique designer vases await to add an artistic
          touch to your cherished spaces.
        </span>
        <RegistrationForm />
      </div>
      <div className="image_container-small">
        <img src="./assets/images/RegistrationPage_small.webp" alt="Small image" />
      </div>
    </div>
  );
};
