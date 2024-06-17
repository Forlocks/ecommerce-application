import React from 'react';
import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../ProductPrice/Price/Price';
import { IProductCartCardProps } from './IProductCartCardProps';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';
import { cartAddLineItem, cartRemoveLineItem, getCart } from '../../../../controllers/api/Cart';
import { QuantityInput } from '../../inputs/QuantityInput/QuantityInput';

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
  const { name, price, variant, id, productId } = product;
  const discountedPrice = calculateDiscountedPrice(price);
  const oldPrice = calculateOldPrice(price);
  const discountPercentage = calculateDiscountPercentage(price);
  const closeIcon = <img src="./assets/icons/cross.svg" alt="close" />;
  let quantity = product.quantity;
  const variantId = variant?.id || null;
  const colorAttribute =
    variant?.attributes?.find((attr) => attr.name === 'attribute-colour-03')?.value || '';
  const styleAttribute =
    variant?.attributes?.find((attr) => attr.name === 'attribute-style-01')?.value || '';
  const materialAttribute =
    variant?.attributes?.find((attr) => attr.name === 'attribute-material-02')?.value || '';

  const handleDecrease = async () => {
    const currentCart = await getCart();
    const currentLineItems = currentCart[currentCart.length - 1].lineItems;
    console.log(currentLineItems);
    const containsId = currentLineItems.some((item) => item.id === id);
    if (containsId) {
      quantity--;
      try {
        await cartRemoveLineItem(id, 1);
        onRemove();
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }
  };

  const handleIncrease = async () => {
    quantity++;
    await cartAddLineItem(productId, undefined, product.variant.id);
    onRemove();
  };

  return (
    <div className={`product-card ${className}`}>
      <div className="product-image-container">
        {variant?.images?.[0] && (
          <ProductImage url={variant.images[0].url} alt="Product Image" className="product-image" />
        )}
      </div>
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

        <p>
          Variant: {variantId} in {colorAttribute} color
        </p>
        <p>
          This is {name['en-US']}, a {styleAttribute} style masterpiece in {colorAttribute} color,
          made of {materialAttribute}. A superb choice.
        </p>
        <div className="card-cart-footer">
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
          <QuantityInput
            className={className}
            value={quantity}
            onChange={() => {}}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>
      </div>
    </div>
  );
};
