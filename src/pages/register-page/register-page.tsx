import * as React from "react";
import { Link } from "react-router-dom";
import './register-page.scss';

export default function RegisterPage() {
  return (
    <div className="register-page">
      <h1>Register Page</h1>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}