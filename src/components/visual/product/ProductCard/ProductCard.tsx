import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Price } from '../ProductPrice/Price/Price';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';
import { IProductCardProps } from './IProductCardProps';
import { ProductImage } from '../ProductImage/ProductImage';
import { ShortProductDescription } from '../ProductDescription/ShortProductDescription/ShortProductDescription';

const formatPercentage = (percentage: number) => Math.round(percentage).toString();

const calculateDiscountedPrice = (mainPrice?: {
  discounted?: { value: { centAmount: number } };
}) => {
  if (mainPrice?.discounted?.value.centAmount) {
    return mainPrice.discounted.value.centAmount / 100;
  }
  return null;
};

const calculateOldPrice = (mainPrice?: { value?: { centAmount: number } }) => {
  if (mainPrice?.value?.centAmount) {
    return mainPrice.value.centAmount / 100;
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
  const oldPrice = calculateOldPrice(mainPrice);
  const discountPercentage = calculateDiscountPercentage(mainPrice);

  const productUrl = `/product/${product.id}`;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onButtonClick();
    setIsButtonDisabled(true);
  };

  return (
    <Link to={productUrl} className={`product-card ${className}`}>
      {masterVariant?.images?.[0] && (
        <ProductImage url={masterVariant.images[1].url} alt="Product Image" />
      )}
      <h3 className="card-header">{name['en-US']}</h3>
      {description && <ShortProductDescription description={description['en-US']} maxLength={80} />}
      {mainPrice && (
        <Price
          price={
            discountedPrice !== null
              ? parseFloat(discountedPrice.toFixed(2))
              : parseFloat((mainPrice.value.centAmount / 100).toFixed(2))
          }
          currencyCode={mainPrice.value.currencyCode}
          discounted={!!discountedPrice}
          discountPercentage={
            discountPercentage !== null
              ? parseInt(formatPercentage(discountPercentage), 10)
              : undefined
          }
          className={discountedPrice !== null ? 'discounted-price' : 'main-price'}
          oldPrice={oldPrice !== null ? parseFloat(oldPrice.toFixed(2)) : null}
        />
      )}
      <MediumButton
        disabled={isButtonDisabled}
        disabledText="In Cart"
        className="product-button"
        onClick={handleButtonClick}
      >
        Add to cart
      </MediumButton>
    </Link>
  );
};
