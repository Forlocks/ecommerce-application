import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductColor } from './ProductColor';
import { IProductColorProps } from './IProductColor';

describe('ProductColor', () => {
  it('renders the correct color', () => {
    const mockProps: IProductColorProps = { color: 'Red' };
    const { getByText } = render(<ProductColor {...mockProps} />);

    const colorElement = getByText('Red');
    expect(colorElement).toBeInTheDocument();
  });
});
