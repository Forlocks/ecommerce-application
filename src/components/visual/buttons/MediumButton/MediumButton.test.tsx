import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediumButton } from './MediumButton';
import { IMediumButtonProps } from './IMediumButton';

const props: IMediumButtonProps = {
  children: 'Click me',
  onClick: jest.fn(),
};

test('render the MediumButton with children', () => {
  render(<MediumButton {...props} />);

  const buttonElement = screen.getByRole('button');
  const childrenElement = screen.getByText('Click me');

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('button button--medium');
  expect(childrenElement).toBeInTheDocument();
});

test('apply additional props to the BasicButton', () => {
  render(<MediumButton {...props} data-testid="medium-button" />);

  const buttonElement = screen.getByTestId('medium-button');
  expect(buttonElement).toBeInTheDocument();
});

test('handle onClick event', () => {
  render(<MediumButton {...props} />);

  const buttonElement = screen.getByRole('button');
  buttonElement.click();
  expect(props.onClick).toHaveBeenCalled();
});
