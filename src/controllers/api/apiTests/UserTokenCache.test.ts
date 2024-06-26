import { TokenStore } from '@commercetools/sdk-client-v2';
import { UserTokenCache } from '../UserTokenCache';

describe('UserTokenCache', () => {
  let tokenCache: UserTokenCache;

  beforeEach(() => {
    tokenCache = new UserTokenCache();
  });

  test('initialize with an empty token store', () => {
    const expectedTokenStore: TokenStore = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };

    expect(tokenCache.get()).toEqual(expectedTokenStore);
  });

  test('set and get token store correctly', () => {
    const newTokenStore: TokenStore = {
      token: 'newToken',
      expirationTime: Date.now() + 5000000,
      refreshToken: 'newRefreshToken',
    };

    tokenCache.set(newTokenStore);
    expect(tokenCache.get()).toEqual(newTokenStore);
  });
});
