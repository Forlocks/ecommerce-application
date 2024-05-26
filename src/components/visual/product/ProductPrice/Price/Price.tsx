import React from 'react';
import { BasePrice } from '../BasePrice/BasePrice';
import { DiscountedPrice } from '../DiscountedPrice/DiscountedPrice';
import { IPriceProps } from './IPriceProps';
import { OldPrice } from '../OldPrice/OldPrice';

export const Price: React.FC<IPriceProps> = ({
  price,
  currencyCode,
  discounted,
  discountPercentage,
  className,
}) => {
  if (discounted && discountPercentage !== undefined) {
    return (
      <div className="card-prices">
        <DiscountedPrice price={price} currencyCode={currencyCode} className={className} />
        <OldPrice
          discountPercentage={discountPercentage}
          price={price}
          currencyCode={currencyCode}
          className={className}
        />
      </div>
    );
  }

  return <BasePrice price={price} currencyCode={currencyCode} className={className} />;
};
