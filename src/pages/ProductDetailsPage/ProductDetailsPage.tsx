import React from 'react';
import { useParams } from 'react-router-dom';
import { IPage } from '../IPage';

export const ProductDetailsPage: React.FC<IPage> = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
    </div>
  );
};
