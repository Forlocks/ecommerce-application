import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SmallButton } from './SmallButton';
import { ISmallButtonProps } from './ISmallButton';

const props: ISmallButtonProps = {
  icon: <span data-testid="icon">Icon</span>,
  children: 'Click me',
  onClick: jest.fn(),
};

test('render the SmallButton with icon and children', () => {
  render(<SmallButton {...props} />);

  const buttonElement = screen.getByRole('button');
  const iconElement = screen.getByTestId('icon');
  const childrenElement = screen.getByText('Click me');

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('button button--small');
  expect(iconElement).toBeInTheDocument();
  expect(childrenElement).toBeInTheDocument();
});

test('apply additional props to the BasicButton', () => {
  render(<SmallButton {...props} data-testid="small-button" />);

  const buttonElement = screen.getByTestId('small-button');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveAttribute('type', 'button');
});

test('handle onClick event', () => {
  render(<SmallButton {...props} />);

  const buttonElement = screen.getByRole('button');
  buttonElement.click();
  expect(props.onClick).toHaveBeenCalled();
});
