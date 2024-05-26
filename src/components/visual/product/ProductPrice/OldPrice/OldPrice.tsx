import React from 'react';
import { BasePrice } from '../BasePrice/BasePrice';
import { IOldPriceProps } from './IOldPriceProps';

export const OldPrice: React.FC<IOldPriceProps> = ({
  price,
  currencyCode,
  className,
  discountPercentage,
}) => {
  const oldPrice = price / (1 - discountPercentage / 100);

  return (
    <div className={`${className} old`}>
      <BasePrice price={oldPrice} currencyCode={currencyCode} className="old" />
      <div className="discount">
        <p>-{discountPercentage}%</p>
      </div>
    </div>
  );
};
