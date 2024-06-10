import { LineItem } from '@commercetools/platform-sdk';

export interface IProductCartCardProps {
  product: LineItem;
  onButtonClick: () => void;
  className?: string;
  onRemove: () => void;
}
