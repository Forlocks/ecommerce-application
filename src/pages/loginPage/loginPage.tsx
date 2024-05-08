import React from 'react';
import LoginForm from '../../components/visual/forms/LoginForm/LoginForm';

const LoginPage: React.FC = () => (
  <div className="login_page">
    <div className="form_container">
    <h2>Login Page</h2>
      <LoginForm />
      </div>
      <div className="image_container-big">
        <img src="./assets/images/loginPage_big.png" alt="First image" />
      </div>
      <div className="image_container-small">
        <img src="./assets/images/loginPage_small.png"alt="Second image" />
      </div>
    
  </div>
);

export default LoginPage;

