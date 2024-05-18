import React from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/visual/forms/LoginForm/LoginForm';
import { Logo } from '../../components/visual/logo/Logo';

export const LoginPage: React.FC = function () {
  return (
    <div className="login_page">
      <div className="content_container">
        <Logo className="logo-main" />
        <h2>
          Welcome Back
          <br />
          Please Sign In
        </h2>
        <span>
          Welcome to our boutique of elegance, where unique designer vases await to add an artistic
          touch to your cherished spaces. Sign in to explore our exclusive collection and bring the
          essence of style into your home
        </span>
        <LoginForm />
      </div>
      <div className="image_container-big">
        <img src="./assets/images/loginPage_big.webp" alt="Big image" />
      </div>
      <div className="image_container-small">
        <img src="./assets/images/loginPage_small.webp" alt="Small image" />
      </div>
    </div>
  );
};
