import React from 'react';
import { IProductDetailsCardProps } from './IProductDetailsCard';
import { BaseDescription } from '../ProductDescription/BaseDescription/BaseDescription';
import { ProductColor } from '../ProductColor/ProductColor';
import { ProductMaterial } from '../ProductMaterial/ProductMaterial';
import { ProductStyle } from '../ProductStyle/ProductStyle';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../ProductPrice/Price/Price';

export const ProductDetailsCard: React.FC<IProductDetailsCardProps> = ({
  product,
  className,
  onButtonClick,
}) => {
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
  const color =
    (product?.masterVariant?.attributes?.find((attr) => attr.name === 'attribute-colour-03')
      ?.value as string) || 'Unknown';
  const material =
    (product?.masterVariant?.attributes?.find((attr) => attr.name === 'attribute-material-02')
      ?.value as string) || 'Unknown';
  const style =
    (product?.masterVariant?.attributes?.find((attr) => attr.name === 'attribute-style-01')
      ?.value as string) || 'Unknown';
  const description = product.description?.['en-US'] || 'Unknown';

  const { name, masterVariant } = product;
  const mainPrice = masterVariant?.prices?.[0];
  const discountedPrice = calculateDiscountedPrice(mainPrice);
  const oldPrice = calculateOldPrice(mainPrice);
  const discountPercentage = calculateDiscountPercentage(mainPrice);

  return (
    <div className={className}>
      <h3 className="card-header">{name['en-US']}</h3>
      <div className="details-first">
        <BaseDescription description={description} />
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
        <div className="variant-images">
          {product.variants.map((variant, index) => (
            <div key={index} className={`${index + 1}`}>
              {/* Проверка наличия основного изображения варианта */}
              {variant.images && variant.images.length > 0 && (
                <ProductImage url={variant.images[0].url} alt={`Variant ${index + 1} Image`} />
              )}
            </div>
          ))}
        </div>
        <LargeButton className="product-button" onClick={onButtonClick}>
          Complete Order
        </LargeButton>
      </div>

      <div className="details-second">
        {masterVariant?.images?.[0] && (
          <ProductImage url={masterVariant.images[0].url} alt="Product Image" />
        )}
      </div>
      <div className="details-third">
        <ProductColor color={color} />
        <ProductMaterial material={material} />
        <ProductStyle style={style} />
      </div>
    </div>
  );
};
