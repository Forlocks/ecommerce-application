import React from 'react';
import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../ProductPrice/Price/Price';
import { IProductCartCardProps } from './IProductCartCardProps';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';
import { cartRemoveLineItem } from '../../../../controllers/api/Cart';


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

export const ProductCartCard: React.FC<IProductCartCardProps> = ({
  product,
  className,
  onRemove,
}) => {
  console.log(';;', product);
  const { name, price, variant, id } = product;
  const discountedPrice = calculateDiscountedPrice(price);
  const oldPrice = calculateOldPrice(price);
  const discountPercentage = calculateDiscountPercentage(price);
  const closeIcon = <img src="./assets/icons/cross.svg" alt="close" />;
  return (
    <div className={`product-card ${className}`}>
      {variant?.images?.[0] && (
        <ProductImage url={variant.images[1].url} alt="Product Image" className="product-image" />
      )}
      <div className="card-cart-description">
        <div className="card-cart-header">
          <h3 className="card-header">{name['en-US']}</h3>
          <SmallButton
            icon={closeIcon}
            onClick={async () => {
              await cartRemoveLineItem(id);
              onRemove();
            }}
          />
        </div>
        {price && (
          <Price
            price={
              discountedPrice !== null
                ? parseFloat(discountedPrice.toFixed(2))
                : parseFloat((price.value.centAmount / 100).toFixed(2))
            }
            discounted={!!discountedPrice}
            className={discountedPrice !== null ? 'discounted-price' : 'main-price'}
            oldPrice={oldPrice !== null ? parseFloat(oldPrice.toFixed(2)) : null}
            currencyCode={price.value.currencyCode}
            discountPercentage={
              discountPercentage !== null
                ? parseInt(formatPercentage(discountPercentage), 10)
                : undefined
            }
          />
        )}
        {/* <QuantityInput
          value={quantity}
          onChange={handleChange}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        /> */}
      </div>
    </div>
  );
};
