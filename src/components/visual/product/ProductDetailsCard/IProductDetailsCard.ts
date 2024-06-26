import { IProductCardProps } from '../ProductCard/IProductCardProps';

export interface IProductDetailsCardProps extends IProductCardProps {
  updateCartItemsQuantity: (quantity: number) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal?: () => void;
}
