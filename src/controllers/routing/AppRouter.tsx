import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { MainPage } from '../../pages/MainPage/MainPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Layout } from '../../components/visual/layout/Layout';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { ShopPage } from '../../pages/ShopPage/ShopPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';

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
    {
      path: '/shop',
      element: (
        <Layout>
          <ShopPage />
        </Layout>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <Layout>
            <ProfilePage />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/product/:id',
      element: (
        <Layout>
          <ProductDetailsPage />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
