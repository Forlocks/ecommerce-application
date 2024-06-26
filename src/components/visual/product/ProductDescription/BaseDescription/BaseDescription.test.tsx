import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BaseDescription } from './BaseDescription';
import { IBaseDescriptionProps } from './IBaseDescriptionProps';

describe('BaseDescription', () => {
  it('renders the correct description', () => {
    const mockProps: IBaseDescriptionProps = { description: 'This is a test description' };
    const { getByText } = render(<BaseDescription {...mockProps} />);

    const descriptionElement = getByText('This is a test description');
    expect(descriptionElement).toBeInTheDocument();
  });
});
