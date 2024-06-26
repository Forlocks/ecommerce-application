import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ShortProductDescription } from './ShortProductDescription';
import { IShortProductDescriptionProps } from './IShortProductDescriptionProps';

jest.mock('../BaseDescription/BaseDescription', () => ({
  BaseDescription: ({ description }: { description: string }) => <p>{description}</p>,
}));

describe('ShortProductDescription', () => {
  it('renders the full description if maxLength is not provided', () => {
    const mockProps: IShortProductDescriptionProps = { description: 'This is a full description' };
    const { getByText } = render(<ShortProductDescription {...mockProps} />);

    const descriptionElement = getByText('This is a full description');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the full description if description length is less than maxLength', () => {
    const mockProps: IShortProductDescriptionProps = { description: 'Short desc', maxLength: 20 };
    const { getByText } = render(<ShortProductDescription {...mockProps} />);

    const descriptionElement = getByText('Short desc');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the truncated description if description length exceeds maxLength', () => {
    const mockProps: IShortProductDescriptionProps = {
      description: 'This is a long description',
      maxLength: 10,
    };
    const { getByText } = render(<ShortProductDescription {...mockProps} />);

    const descriptionElement = getByText('This is a ...');
    expect(descriptionElement).toBeInTheDocument();
  });
});
