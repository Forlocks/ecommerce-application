import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Layout } from './Layout';

jest.mock('../header/Header', () => ({
  Header: () => <div data-testid="header">Mock Header</div>,
}));

describe('Layout component', () => {
  test('renders the Header component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders children content', () => {
    const testContent = 'Test Content';
    render(
      <Layout>
        <div>{testContent}</div>
      </Layout>,
    );
    const contentElement = screen.getByText(testContent);
    expect(contentElement).toBeInTheDocument();
  });
});
