import { Cart } from '@commercetools/platform-sdk';
import { user, userTokenCache } from '../..';

export async function createCart() {
  if (localStorage.getItem('userState') === 'false' || !localStorage.getItem('userState')) {
    await user.setAnonymousFlow();
  }
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  try {
    const response = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
          country: 'US',
        },
      })
      .execute();
    if (
      localStorage.getItem('userTokenStorage') === null ||
      localStorage.getItem('userTokenStorage') === ''
    ) {
      user.setUserToken(userTokenCache.get());
    }
    return response.body;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getCart() {
  if (localStorage.getItem('userState') === 'false' || !localStorage.getItem('userState')) {
    await user.setAnonymousFlow();
  }
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  try {
    const response = await apiRoot.me().carts().get().execute();
    if (
      localStorage.getItem('userTokenStorage') === null ||
      localStorage.getItem('userTokenStorage') === ''
    ) {
      user.setUserToken(userTokenCache.get());
    }
    return response.body.results;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function cartAddLineItem(productId?: string, quantity?: number, variantId?: number) {
  if (localStorage.getItem('userState') === 'false' || !localStorage.getItem('userState')) {
    await user.setAnonymousFlow();
  }
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  const carts = (await getCart()) as unknown as Cart[];
  const cart = carts[carts.length - 1] || ((await createCart()) as Cart);
  const { version, id } = cart;
  try {
    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'addLineItem', productId, quantity, variantId }],
        },
      })
      .execute();
    if (
      localStorage.getItem('userTokenStorage') === null ||
      localStorage.getItem('userTokenStorage') === ''
    ) {
      user.setUserToken(userTokenCache.get());
    }
    return response.body;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function cartRemoveLineItem(lineItemId: string, quantity?: number) {
  const cartsArr = await getCart();
  const cartId = cartsArr[cartsArr.length - 1].id;
  const cartVersion = cartsArr[cartsArr.length - 1].version;
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  try {
    await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
              quantity,
            },
          ],
        },
      })
      .execute();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function addDiscountCode(discountCode: string) {
  const cartsArr = await getCart();
  const cartId = cartsArr[cartsArr.length - 1].id;
  const cartVersion = cartsArr[cartsArr.length - 1].version;
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  try {
    return await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [
            {
              action: 'addDiscountCode',
              code: discountCode,
            },
          ],
        },
      })
      .execute();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
