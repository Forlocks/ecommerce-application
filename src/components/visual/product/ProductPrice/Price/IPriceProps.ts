import { IBasePriceProps } from '../BasePrice/IBasePriceProps';

export interface IPriceProps extends IBasePriceProps {
  discounted?: boolean;
  discountPercentage?: number;
  oldPrice?: number | null;
}
