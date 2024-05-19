import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BasicButton } from './BasicButton';

test('renders button with text', () => {
  render(<BasicButton>Click me</BasicButton>);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('applies additional props', () => {
  render(<BasicButton aria-label="basic button">Click me</BasicButton>);
  const buttonElement = screen.getByLabelText(/basic button/i);
  expect(buttonElement).toBeInTheDocument();
});
