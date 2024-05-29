import React from 'react';
import { BasePrice } from '../BasePrice/BasePrice';
import { IDiscountedPriceProps } from './IDiscountedPriceProps';

export const DiscountedPrice: React.FC<IDiscountedPriceProps> = ({
  price,
  currencyCode,
  className,
}) => (
  <div className={`${className} new`}>
    <BasePrice price={price} currencyCode={currencyCode} className="new" />
  </div>
);
