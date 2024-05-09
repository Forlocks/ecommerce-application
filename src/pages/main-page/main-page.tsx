import * as React from 'react';
import { Link } from 'react-router-dom';
import './main-page.scss';

export default function MainPage() {
  return (
    <div className="main-page">
      <h1>Main Page</h1>
      <Link to="register">Register</Link>
      <Link to="login">Login</Link>
    </div>
  );
}