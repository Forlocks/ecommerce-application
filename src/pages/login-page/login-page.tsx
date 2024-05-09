import * as React from "react";
import { Link } from "react-router-dom";
import './login-page.scss';

export default function LoginPage() {
  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <Link to="/">Main</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}