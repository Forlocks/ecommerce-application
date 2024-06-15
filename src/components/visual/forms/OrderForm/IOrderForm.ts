export interface IOrderFormState {
  promocode: string;
  promoError: string;
  totalPrice: number;
  originalTotalPrice: number;
  appliedPromoCodes: string[];
  discountPercentage: number;
  cartItemsQuantity: number;
}

export interface IOrderForm {
  totalPrice: number;
  originalTotalPrice: number;
  cartItemsQuantity: number;
  appliedPromoCodes: string[];
}
