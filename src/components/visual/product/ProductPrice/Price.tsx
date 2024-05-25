import React from 'react';
import { IPriceProps } from './IPriceProps';

export const Price: React.FC<IPriceProps> = ({
  price,
  currencyCode,
  discounted,
  discountPercentage,
  className,
}) => (
  <div className={`price ${discounted ? 'price_old' : ''} ${className}`}>
    <p>{currencyCode === 'USD' && '$'}</p>
    <p>{price}</p>
    {discountPercentage && <p className="discount">-{discountPercentage}%</p>}
  </div>
);
