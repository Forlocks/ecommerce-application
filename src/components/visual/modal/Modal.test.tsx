import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Modal } from './Modal';
import { IModal } from './IModal';

describe('Modal', () => {
  it('does not render when isShow is false', () => {
    const mockProps: IModal = { isShow: false, onClose: jest.fn(), children: <div>Content</div> };
    const { queryByText } = render(<Modal {...mockProps} />);

    expect(queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders when isShow is true', () => {
    const mockProps: IModal = { isShow: true, onClose: jest.fn(), children: <div>Content</div> };
    const { getByText } = render(<Modal {...mockProps} />);

    expect(getByText('Content')).toBeInTheDocument();
  });
});
