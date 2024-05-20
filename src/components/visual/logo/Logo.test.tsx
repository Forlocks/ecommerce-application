import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Logo } from './Logo';

describe('Logo component', () => {
  test('renders the Logo component', () => {
    render(<Logo />);
    const chicElement = screen.getByText('Chic');
    const ampersandElement = screen.getByText('&');
    const vesselElement = screen.getByText('Vessel');

    expect(chicElement).toBeInTheDocument();
    expect(ampersandElement).toBeInTheDocument();
    expect(vesselElement).toBeInTheDocument();
  });

  test('applies the passed className', () => {
    const className = 'custom-logo-class';
    const { container } = render(<Logo className={className} />);

    expect(container.firstChild).toHaveClass(className);
  });
});
