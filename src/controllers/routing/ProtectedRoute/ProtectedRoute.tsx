import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IProtectedRoute } from './IProtectedRoute';

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const userState = localStorage.getItem('userState');
  const location = useLocation();

  if (userState === 'true' && location.pathname !== '/profile') {
    alert('You are already logged in!');
    return <Navigate to="/" />;
  }

  if (userState === 'false' && location.pathname === '/profile') {
    alert('Only logged-in users can access the User Profile page');
    return <Navigate to="/" />;
  }

  return children;
};
