import React from 'react';
import { IBurgerButton } from './IBurgerButton';
import './BurgerButton.scss';

export const BurgerButton: React.FC<IBurgerButton> = ({ isBurgerMenuOpen, toggleBurgerMenu }) => {
  function handleClick() {
    toggleBurgerMenu();
  }

  return (
    <div className={`burger-button ${isBurgerMenuOpen ? 'active' : ''}`} onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
