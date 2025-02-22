import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import { IOrderForm, IOrderFormState } from './IOrderForm';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { MediumButton } from '../../buttons/MediumButton/MediumButton';
import { addDiscountCode } from '../../../../controllers/api/Cart';
import { validatePromo } from '../../../non-visual/validators/validators';

const promoCodesMap: { [key: string]: string } = {
  'f8dcaf30-651d-4f59-9767-c5a8f433a904': 'DISCOUNT10',
  '03d184af-f406-4104-9fdb-8a81a7fa8a42': 'DISCOUNT35',
};

export const OrderForm: React.FC<IOrderForm> = ({
  totalPrice,
  originalTotalPrice,
  cartItemsQuantity,
  appliedPromoCodes,
}) => {
  const [state, setState] = useState<IOrderFormState>({
    promocode: '',
    promoError: '',
    totalPrice,
    originalTotalPrice,
    appliedPromoCodes,
    cartItemsQuantity,
    discountPercentage: 0,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getReadablePromoCodes = (promoCodes: string[]): string[] => {
    return promoCodes.map((code) => promoCodesMap[code] || code);
  };

  const applyPromo = async (promocode: string) => {
    if (promocode === 'DISCOUNT10' || promocode === 'DISCOUNT35') {
      const response = await addDiscountCode(promocode);
      const newTotalPrice = response.body.totalPrice.centAmount / 100;
      const discountPercentage =
        ((state.originalTotalPrice - newTotalPrice) / state.originalTotalPrice) * 100;

      setState((prevState) => ({
        ...prevState,
        totalPrice: newTotalPrice,
        appliedPromoCodes: [...prevState.appliedPromoCodes, promocode],
        discountPercentage,
        promocode: '',
      }));
      setIsButtonDisabled(true);
    }
  };

  const handlePromoChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPromo = event.target.value.trim();
    setState((prevState) => ({ ...prevState, promocode: newPromo, promoError: '' }));
    setIsButtonDisabled(newPromo === '');
  };

  const handleApplyPromo = () => {
    const promoError = validatePromo(state.promocode, state.appliedPromoCodes);
    if (promoError === '') {
      applyPromo(state.promocode);
    } else {
      setState((prevState) => ({ ...prevState, promoError }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Complete Order');
  };

  useEffect(() => {
    const discountPercentage = ((originalTotalPrice - totalPrice) / originalTotalPrice) * 100;
    setState((prevState) => ({
      ...prevState,
      totalPrice,
      originalTotalPrice,
      discountPercentage,
      cartItemsQuantity,
      appliedPromoCodes,
    }));
  }, [totalPrice, originalTotalPrice]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="price-quantity-container">
        <div className="price-container">
          <h2>$ {state.totalPrice.toFixed(2)}</h2>
          {state.discountPercentage > 0 && (
            <>
              <h3>$ {state.originalTotalPrice.toFixed(2)}</h3>
              <h3>- {Math.round(state.discountPercentage)} %</h3>
            </>
          )}
        </div>
        <div className="quantity-container">
          <h3>Order summary for {state.cartItemsQuantity} items</h3>
        </div>
        <div className="promo-codes-container">
          <h5>
            Applied promo code:{' '}
            {state.appliedPromoCodes.length > 0
              ? getReadablePromoCodes(state.appliedPromoCodes).join(', ')
              : 'no promo'}
          </h5>
        </div>
      </div>
      <span>
        If you have a promotional code, please enter it in the field below. Applying your promo code
        will allow you to see the discount applied to your total purchase. Please note that you can
        apply only one promo code at a time.
      </span>

      <TextInput
        label="Promo code"
        name="promocode"
        placeholder="Enter your promo code"
        value={state.promocode}
        onChange={handlePromoChange}
        error={state.promoError}
      />

      <MediumButton
        disabled={isButtonDisabled}
        disabledText="Wait promo"
        className="product-button"
        onClick={handleApplyPromo}
      >
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
