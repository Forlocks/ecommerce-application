import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Logo } from '../logo/Logo';
import { BurgerButton } from '../buttons/BurgerButton/BurgerButton';
import { user } from '../../../index';

export const Header: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';
  const userState = localStorage.getItem('userState');

  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const closeBurgerMenu = () => {
    setBurgerMenuOpen(false);
  };

  const handleLogout = () => {
    user.logout();

    closeBurgerMenu();
  };

  return (
    <header className="header">
      <NavLink to="/" onClick={closeBurgerMenu}>
        <Logo className="logo-header" />
      </NavLink>
      <nav className={isBurgerMenuOpen ? 'burger-menu_active' : 'burger-menu_inactive'}>
        <ul>
          {isAuthPage ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeBurgerMenu}
                >
                  Log In
                </NavLink>
              </li>
              <li id="register-link">
                <NavLink
                  to="/registration"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeBurgerMenu}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeBurgerMenu}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeBurgerMenu}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeBurgerMenu}
                >
                  Cart
                </NavLink>
              </li>
              {userState === 'false' ? (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                    onClick={closeBurgerMenu}
                  >
                    Log In
                  </NavLink>
                </li>
              ) : null}
              {userState === 'false' ? (
                <li id="register-link">
                  <NavLink
                    to="/registration"
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                    onClick={closeBurgerMenu}
                  >
                    Register
                  </NavLink>
                </li>
              ) : null}
              {userState === 'true' ? (
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                    onClick={closeBurgerMenu}
                  >
                    Profile
                  </NavLink>
                </li>
              ) : null}
              {userState === 'true' ? (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                    onClick={handleLogout}
                  >
                    Log out
                  </NavLink>
                </li>
              ) : null}
            </>
          )}
        </ul>
      </nav>
      <BurgerButton
        isBurgerMenuOpen={isBurgerMenuOpen}
        toggleBurgerMenu={toggleBurgerMenu}
      ></BurgerButton>
    </header>
  );
};
