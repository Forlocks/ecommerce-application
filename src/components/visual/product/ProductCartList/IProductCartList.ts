export interface IProductCartList {
  updateTotalPrice: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal?: () => void;
  updateCartItemsQuantity: (newQuantity: number) => void;
}
