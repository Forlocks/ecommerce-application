import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LargeButton } from './LargeButton';
import { ILargeButtonProps } from './ILargeButton';

const props: ILargeButtonProps = {
  children: 'Click me',
  onClick: jest.fn(),
};

test('renders children and button content correctly', () => {
  const buttonText = 'Click me';
  const { getByText, container } = render(<LargeButton>{buttonText}</LargeButton>);

  expect(getByText(buttonText)).toBeInTheDocument();
  expect(container.querySelector('.button__content')).toBeInTheDocument();
});

test('applies additional classes properly ', () => {
  render(<LargeButton {...props} />);

  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveClass('button button--large');
});

test('handles onClick event properly', () => {
  const onClickMock = jest.fn();
  const { container } = render(<LargeButton onClick={onClickMock} />);

  fireEvent.click(container.querySelector('.button__content') as HTMLDivElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('disables button when disabled prop is true', () => {
  const { container } = render(<LargeButton disabled />);

  expect(container.querySelector('.button__content')).toBeDisabled();
});
