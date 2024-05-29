import { IBasePriceProps } from '../BasePrice/IBasePriceProps';

export interface IOldPriceProps extends IBasePriceProps {
  discountPercentage: number;
  oldPrice?: number | null;
}
