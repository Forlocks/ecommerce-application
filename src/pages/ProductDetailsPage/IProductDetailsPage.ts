export interface IProductDetailsPage {
  openModal: (content: React.ReactNode) => void;
  closeModal?: () => void;
  updateCartItemsQuantity: (newQuantity: number) => void;
}
