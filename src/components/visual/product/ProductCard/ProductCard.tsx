import React from 'react';
import { Price } from '../ProductPrice/Price/Price';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';
import { IProductCardProps } from './IProductCardProps';
import { ProductImage } from '../ProductImage/ProductImage';
import { ShortProductDescription } from '../ProductDescription/ShortProductDescription/ShortProductDescription';

const calculateDiscountedPrice = (mainPrice?: {
  discounted?: { value: { centAmount: number } };
}) => {
  if (mainPrice?.discounted?.value.centAmount) {
    return mainPrice.discounted.value.centAmount / 100;
  }
  return null;
};

const calculateDiscountPercentage = (mainPrice?: {
  discounted?: { value: { centAmount: number } };
  value: { centAmount: number };
}) => {
  if (mainPrice && mainPrice.discounted) {
    return 100 - (mainPrice.discounted.value.centAmount * 100) / mainPrice.value.centAmount;
  }
  return null;
};

export const ProductCard: React.FC<IProductCardProps> = ({ product, className, onButtonClick }) => {
  const { name, masterVariant, description } = product;
  const mainPrice = masterVariant?.prices?.[0];
  const discountedPrice = calculateDiscountedPrice(mainPrice);
  const discountPercentage = calculateDiscountPercentage(mainPrice);

  return (
    <div className={`product-card ${className}`}>
      {masterVariant?.images?.[0] && (
        <ProductImage url={masterVariant.images[0].url} alt="Product Image" />
      )}
      <h3 className="card-header">{name['en-US']}</h3>
      {description && (
        <ShortProductDescription description={description['en-US']} maxLength={100} />
      )}
      {mainPrice && (
        <Price
          price={discountedPrice || mainPrice.value.centAmount / 100}
          currencyCode={mainPrice.value.currencyCode}
          discounted={!!discountedPrice}
          discountPercentage={discountPercentage || undefined}
          className={discountedPrice ? 'discounted-price' : 'main-price'}
        />
      )}
      <MediumButton className="product-button" onClick={onButtonClick}>
        Add to cart
      </MediumButton>
    </div>
  );
};
