import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BurgerButton } from './BurgerButton';
import { IBurgerButton } from './IBurgerButton';

test('calls toggleBurgerMenu function on click', () => {
  const toggleBurgerMenu = jest.fn();
  const props: IBurgerButton = {
    isBurgerMenuOpen: false,
    toggleBurgerMenu,
  };

  render(<BurgerButton {...props} />);

  const button = document.querySelector('.burger-button') as HTMLButtonElement;
  fireEvent.click(button);

  expect(toggleBurgerMenu).toHaveBeenCalledTimes(1);
});

test('has active class when isBurgerMenuOpen is true', () => {
  const props: IBurgerButton = {
    isBurgerMenuOpen: true,
    toggleBurgerMenu: jest.fn(),
  };

  render(<BurgerButton {...props} />);

  const button = document.querySelector('.burger-button');
  expect(button).toHaveClass('active');
});

test('does not have active class when isBurgerMenuOpen is false', () => {
  const props: IBurgerButton = {
    isBurgerMenuOpen: false,
    toggleBurgerMenu: jest.fn(),
  };

  render(<BurgerButton {...props} />);

  const button = document.querySelector('.burger-button');
  expect(button).not.toHaveClass('active');
});
