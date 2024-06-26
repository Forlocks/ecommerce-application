export interface IPage {
  openModal: (content: React.ReactNode) => void;
  closeModal?: () => void;
}
