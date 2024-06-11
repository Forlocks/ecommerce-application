import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { IOrderForm, IOrderFormState } from './IOrderForm';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';

const validatePromo = (promocode: string): string => {
  // Пример проверки промокода
  if (promocode === 'DISCOUNT10') {
    return '';
  }
  return 'Invalid promocode';
};

const applyPromo = (promocode: string, currentAmount: number): number => {
  if (promocode === 'DISCOUNT10') {
    return currentAmount * 0.9; // Скидка 10%
  }
  return currentAmount;
};

export const OrderForm: React.FC<IOrderForm> = ({ totalPrice }) => {
  const [state, setState] = useState<IOrderFormState>({
    promocode: '',
    promoError: '',
    totalPrice,
  });

  const handlePromoChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPromo = event.target.value.trim();
    setState((prevState) => ({ ...prevState, promocode: newPromo, promoError: '' }));
  };

  const handleApplyPromo = () => {
    const promoError = validatePromo(state.promocode);
    if (promoError === '') {
      const newTotalPrice = applyPromo(state.promocode, state.totalPrice);
      setState((prevState) => ({ ...prevState, totalPrice: newTotalPrice, promoError: '' }));
    } else {
      setState((prevState) => ({ ...prevState, promoError }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Complete Order');
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, totalPrice }));
  }, [totalPrice]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2> ${state.totalPrice.toFixed(2)}</h2>
        <span>
          If you have a promotional code, please enter it in the field below. Applying your promo
          code will allow you to see the discount applied to your total purchase. Don't miss out on
          the opportunity to save on your order!
        </span>
      </div>
      <TextInput
        label="Promo code"
        name="promocode"
        placeholder="Enter your promo code"
        value={state.promocode}
        onChange={handlePromoChange}
        error={state.promoError}
      />
      <MediumButton type="button" onClick={handleApplyPromo}>
        Apply
      </MediumButton>
      <div className="order-buttons">
        <LargeButton type="submit">Complete Order</LargeButton>
        <div className="link">
          <span>
            Don’t have a promo code?&nbsp;
            <NavLink to="/">Get it</NavLink>
          </span>
        </div>
      </div>
    </form>
  );
};
