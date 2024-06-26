export interface ICartPage {
  openModal: (content: React.ReactNode) => void;
  closeModal?: () => void;
  updateCartItemsQuantity: (newQuantity: number) => void;
}
