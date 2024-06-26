import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class UserTokenCache implements TokenCache {
  UserTokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  get() {
    return this.UserTokenStore;
  }

  set(newUserTokenStore: TokenStore) {
    this.UserTokenStore = newUserTokenStore;
  }
}
