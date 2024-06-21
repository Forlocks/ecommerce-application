import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Navigate: jest.fn(() => null),
}));

const openModalMock = jest.fn();

describe('ProtectedRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('navigate to home page if userState is true and path is not /profile', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');
    (jest.requireMock('react-router-dom').useLocation as jest.Mock).mockReturnValue({
      pathname: '/some-path',
    });

    render(
      <MemoryRouter initialEntries={['/some-path']}>
        <Routes>
          <Route
            path="/some-path"
            element={<ProtectedRoute openModal={openModalMock}>Some Page</ProtectedRoute>}
          />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(jest.requireMock('react-router-dom').Navigate).toHaveBeenCalledWith(
      { to: '/', replace: true },
      {},
    );
  });

  it('navigate to home page if userState is false and path is /profile', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('false');
    (jest.requireMock('react-router-dom').useLocation as jest.Mock).mockReturnValue({
      pathname: '/profile',
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path="/profile"
            element={<ProtectedRoute openModal={openModalMock}>Profile Page</ProtectedRoute>}
          />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(jest.requireMock('react-router-dom').Navigate).toHaveBeenCalledWith(
      { to: '/', replace: true },
      {},
    );
  });

  it('call openModal with appropriate message if userState is true and path is not /profile', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');
    (jest.requireMock('react-router-dom').useLocation as jest.Mock).mockReturnValue({
      pathname: '/some-path',
    });

    render(
      <MemoryRouter initialEntries={['/some-path']}>
        <ProtectedRoute openModal={openModalMock}>Some Page</ProtectedRoute>
      </MemoryRouter>,
    );

    expect(openModalMock).toHaveBeenCalledWith(<p>You are already logged in!</p>);
  });

  it('call openModal with appropriate message if userState is false and path is /profile', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('false');
    (jest.requireMock('react-router-dom').useLocation as jest.Mock).mockReturnValue({
      pathname: '/profile',
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <ProtectedRoute openModal={openModalMock}>Profile Page</ProtectedRoute>
      </MemoryRouter>,
    );

    expect(openModalMock).toHaveBeenCalledWith(
      <p>Only logged-in users can access the User Profile page</p>,
    );
  });

  it('render children if userState and path are valid', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');
    (jest.requireMock('react-router-dom').useLocation as jest.Mock).mockReturnValue({
      pathname: '/profile',
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <ProtectedRoute openModal={openModalMock}>
          <div>Profile Page</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });
});
