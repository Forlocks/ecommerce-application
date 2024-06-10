import React from 'react';
import { ShortProductDescription } from '../ProductDescription/ShortProductDescription/ShortProductDescription';
import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../ProductPrice/Price/Price';
import { IProductCartCardProps } from './IProductCartCardProps';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';
// import { QuantityInput } from '../../inputs/QuantityInput/QuantityInput';

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

export const ProductCartCard: React.FC<IProductCartCardProps> = ({ product, className }) => {
  // const [quantity, setQuantity] = useState(product.quantity || 1);
  // const handleIncrease = () => {
  //     setQuantity((prevQuantity) => prevQuantity + 1);
  //   };

  //   const handleDecrease = () => {
  //     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  //   };

  //   const handleChange = (value: number) => {
  //     setQuantity(value);
  //   };
  const { name, masterVariant, description } = product;
  const mainPrice = masterVariant?.prices?.[0];
  const discountedPrice = calculateDiscountedPrice(mainPrice);
  const oldPrice = calculateOldPrice(mainPrice);
  const discountPercentage = calculateDiscountPercentage(mainPrice);
  const closeIcon = <img src="./assets/icons/cross.svg" alt="close" />;

  return (
    <div className={`product-card ${className}`}>
      {masterVariant?.images?.[0] && (
        <ProductImage
          url={masterVariant.images[1].url}
          alt="Product Image"
          className="product-image"
        />
      )}
      <div className="card-cart-description">
        <div className="card-cart-header">
          <h3 className="card-header">{name['en-US']}</h3>
          <SmallButton icon={closeIcon} />
        </div>
        {description && (
          <ShortProductDescription description={description['en-US']} maxLength={80} />
        )}
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
