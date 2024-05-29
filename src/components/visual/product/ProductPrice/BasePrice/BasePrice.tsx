import React from 'react';
import { IBasePriceProps } from './IBasePriceProps';

export const BasePrice: React.FC<IBasePriceProps> = ({ price, currencyCode, className }) => (
  <div className={`base-price ${className}`}>
    {currencyCode === 'USD' && <p>$</p>}
    <p>{price}</p>
  </div>
);
