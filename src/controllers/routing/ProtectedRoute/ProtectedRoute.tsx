import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IProtectedRoute } from './IProtectedRoute';

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, openModal }) => {
  const userState = localStorage.getItem('userState');
  const location = useLocation();

  useEffect(() => {
    if (userState === 'true' && location.pathname !== '/profile') {
      openModal(<p>You are already logged in!</p>);
    } else if (userState === 'false' && location.pathname === '/profile') {
      openModal(<p>Only logged-in users can access the User Profile page</p>);
    }
  }, [userState, location.pathname, openModal]);

  if (userState === 'true' && location.pathname !== '/profile') {
    return <Navigate to="/" replace={true} />;
  }

  if (userState === 'false' && location.pathname === '/profile') {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};
