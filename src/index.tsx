import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MainPage from './pages/MainPage/MainPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.append(root);

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/register',
		element: <RegistrationPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
]);

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);