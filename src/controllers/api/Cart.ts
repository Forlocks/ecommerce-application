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
    return response.body;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function cartAddLineItem(productId: string, quantity?: number) {
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
          actions: [{ action: 'addLineItem', productId, quantity }],
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
