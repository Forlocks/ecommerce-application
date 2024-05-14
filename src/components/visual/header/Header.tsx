import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Logo } from '../logo/Logo';

export const Header: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';

  return (
    <header className="header">
      <NavLink to="/">
        <Logo className="logo-header" />
      </NavLink>
      <nav>
        <ul>
          {isAuthPage ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  Log In
                </NavLink>
              </li>
              <li id="register-link">
                <NavLink
                  to="/registration"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  Cart
                </NavLink>
              </li>
              {localStorage.getItem('userState') === 'true' ? (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    Log out
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => (isActive ? 'active' : undefined)}
                    >
                      Log In
                    </NavLink>
                  </li>
                  <li id="register-link">
                    <NavLink
                      to="/registration"
                      className={({ isActive }) => (isActive ? 'active' : undefined)}
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
