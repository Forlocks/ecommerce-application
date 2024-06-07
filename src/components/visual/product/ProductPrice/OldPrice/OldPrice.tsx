import React from 'react';
import { BasePrice } from '../BasePrice/BasePrice';
import { IOldPriceProps } from './IOldPriceProps';

export const OldPrice: React.FC<IOldPriceProps> = ({
  currencyCode,
  className,
  discountPercentage,
  oldPrice,
}) => (
  <div className={`${className} old`}>
    <BasePrice price={oldPrice} currencyCode={currencyCode} className="old" />
    <div className="discount">
      <p>-{discountPercentage}%</p>
    </div>
  </div>
);
