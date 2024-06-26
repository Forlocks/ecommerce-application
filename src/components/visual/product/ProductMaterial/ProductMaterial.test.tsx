import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductMaterial } from './ProductMaterial';
import '@testing-library/jest-dom/extend-expect';

const mockMaterial = 'glass';

describe('ProductMaterial', () => {
  it('render material correctly', () => {
    render(<ProductMaterial material={mockMaterial} />);

    const materialElement = screen.getByText(/Material:/);
    const materialValueElement = screen.getByText(new RegExp(`${mockMaterial}$`));

    expect(materialElement).toBeInTheDocument();
    expect(materialValueElement).toBeInTheDocument();
  });
});
