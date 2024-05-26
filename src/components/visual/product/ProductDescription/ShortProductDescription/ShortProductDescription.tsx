import React from 'react';
import { BaseDescription } from '../BaseDescription/BaseDescription';
import { IShortProductDescriptionProps } from './IShortProductDescriptionProps';

export const ShortProductDescription: React.FC<IShortProductDescriptionProps> = ({
  description,
  maxLength,
}) => {
  const truncatedDescription =
    maxLength && description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;

  return <BaseDescription description={truncatedDescription} />;
};
