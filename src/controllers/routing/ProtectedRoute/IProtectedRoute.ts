import React from 'react';

export interface IProtectedRoute {
  children: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
}
