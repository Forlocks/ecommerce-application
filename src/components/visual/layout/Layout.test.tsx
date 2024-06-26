import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

jest.mock('../header/Header', () => ({
  Header: () => <div data-testid="header">Mock Header</div>,
}));

test('renders the Header component', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              closeModal={() => {}}
              showModal={false}
              modalContent={null}
              cartItemsQuantity={0}
              updateCartItemsQuantity={(newQuantity: number) => {
                console.log('updateCartItemsQuantity called with:', newQuantity);
              }}
            />
          }
        >
          <Route index element={<div>Test Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
});
