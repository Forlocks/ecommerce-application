import React from 'react';
import { Header } from '../header/Header';
import { LayoutProps } from './ILayout';

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);
