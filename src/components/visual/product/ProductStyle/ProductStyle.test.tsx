import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductStyle } from './ProductStyle';
import '@testing-library/jest-dom/extend-expect';

const mockStyle = 'classic';

describe('ProductStyle', () => {
  it('render style correctly', () => {
    render(<ProductStyle style={mockStyle} />);

    const styleElement = screen.getByText(/Style:/);
    const styleValueElement = screen.getByText(new RegExp(`${mockStyle}$`));

    expect(styleElement).toBeInTheDocument();
    expect(styleValueElement).toBeInTheDocument();
  });
});
