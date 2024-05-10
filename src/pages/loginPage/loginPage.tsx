import React from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/visual/forms/LoginForm/LoginForm';

export const LoginPage: React.FC = function () {
  return (
    <div className="login_page">
      <div className="form_container">
        <h2>Welcome Back Please Sign In</h2>
        <span>
          Welcome to our boutique of elegance, where unique designer vases await to add an artistic
          touch to your cherished spaces. Sign in to explore our exclusive collection and bring the
          essence of style into your home
        </span>
        <LoginForm />
      </div>
      <div className="image_container-big">
        <img src="./assets/images/loginPage_big.png" alt="Big image" />
      </div>
      <div className="image_container-small">
        <img src="./assets/images/loginPage_small.png" alt="Small image" />
      </div>
    </div>
  );
};
