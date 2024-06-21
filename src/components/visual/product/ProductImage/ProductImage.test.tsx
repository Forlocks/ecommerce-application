import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductImage } from './ProductImage';
import { IProductImageProps } from './IProductImageProps';

const mockProps: IProductImageProps = {
  url: 'https://example.com/image.jpg',
  alt: 'Test Image',
  className: 'product-image',
};

describe('ProductImage', () => {
  it('renders with correct props', () => {
    const { getByAltText } = render(<ProductImage {...mockProps} />);

    const imageElement = getByAltText(mockProps.alt) as HTMLImageElement;

    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(mockProps.url);
    expect(imageElement.alt).toBe(mockProps.alt);
    expect(imageElement.className).toBe(mockProps.className);
  });
});
