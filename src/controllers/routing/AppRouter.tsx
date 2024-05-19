import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { MainPage } from '../../pages/MainPage/MainPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Layout } from '../../components/visual/layout/Layout';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <MainPage />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/registration',
      element: (
        <ProtectedRoute>
          <Layout>
            <RegistrationPage />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: (
        <ProtectedRoute>
          <Layout>
            <LoginPage />
          </Layout>
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
