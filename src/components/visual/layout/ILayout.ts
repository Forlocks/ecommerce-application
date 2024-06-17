export interface LayoutProps {
  closeModal: () => void;
  showModal: boolean;
  modalContent: React.ReactNode;
  cartItemsQuantity: number;
  updateCartItemsQuantity: (newQuantity: number) => void;
}
