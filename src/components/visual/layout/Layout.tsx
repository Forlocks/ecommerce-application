import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../header/Header';
import { LayoutProps } from './ILayout';
import { user } from '../../../index';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (
      localStorage.getItem('userState') === 'true' &&
      (location.pathname === '/login' || location.pathname === '/registration')
    ) {
      user.logout();
    }
  }, [location]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};
