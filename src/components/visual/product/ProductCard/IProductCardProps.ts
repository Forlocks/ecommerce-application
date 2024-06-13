import { ProductProjection } from '@commercetools/platform-sdk';

export interface CartProduct {
  id: string;
  variant: number;
}

export interface IProductCardProps {
  product: ProductProjection;
  onButtonClick: () => void;
  className?: string;
  cartProductList: string[] | CartProduct[];
}
