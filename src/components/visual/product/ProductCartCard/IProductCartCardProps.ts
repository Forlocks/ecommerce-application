import { ProductProjection } from '@commercetools/platform-sdk';

export interface IProductCartCardProps {
  product: ProductProjection;
  onButtonClick: () => void;
  className?: string;
}
