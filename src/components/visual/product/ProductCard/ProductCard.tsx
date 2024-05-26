import React from 'react';
import { Price } from '../ProductPrice/Price';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';
import { IProductCardProps } from './IProductCardProps';
import { ProductImage } from '../ProductImage/ProductImage';
import { ShortProductDescription } from '../ProductDescription/ShortProductDescription/ShortProductDescription';

export const ProductCard: React.FC<IProductCardProps> = ({ product, className, onButtonClick }) => {
  const { name, masterVariant, description } = product;
  const mainPrice = masterVariant?.prices?.[0];
  const discountedPrice = (mainPrice?.discounted?.value.centAmount ?? 0) / 100 || null;
  const discountPercentage =
    mainPrice && mainPrice.discounted
      ? 100 - (mainPrice.discounted.value.centAmount * 100) / mainPrice.value.centAmount
      : null;

  return (
    <div className={`product-card ${className}`}>
      {masterVariant && masterVariant.images && masterVariant.images[0] && (
        <ProductImage url={masterVariant.images[0].url} alt="Product Image" />
      )}
      <h3 className="card-header">{name['en-US']}</h3>
      {description && (
        <ShortProductDescription description={description['en-US']} maxLength={100} />
      )}
      <div className="card-prices">
        {discountedPrice && mainPrice && (
          <Price
            price={discountedPrice}
            currencyCode={mainPrice.value.currencyCode}
            className="discounted-price"
          />
        )}
        {mainPrice && (
          <Price
            price={mainPrice.value.centAmount / 100}
            currencyCode={mainPrice.value.currencyCode}
            discounted={!!mainPrice.discounted}
            discountPercentage={discountPercentage || undefined}
            className="main-price"
          />
        )}
      </div>
      <MediumButton className="product-button" onClick={onButtonClick}>
        Add to cart
      </MediumButton>
    </div>
  );
};
