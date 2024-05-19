import React from 'react';
import { Navigate } from 'react-router-dom';
import { IProtectedRoute } from './IProtectedRoute';

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const userState = localStorage.getItem('userState');

  if (userState === 'true') {
    alert('You are already logged in!');
    return <Navigate to="/" />;
  }
  return children;
};
