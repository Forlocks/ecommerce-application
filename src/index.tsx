import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { MainPage } from './pages/MainPage/MainPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Layout } from './components/visual/layout/Layout';
import { User } from './controllers/Api/User';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.append(root);

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
      <Layout>
        <RegistrationPage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);

export const user = new User();
