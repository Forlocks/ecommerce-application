import {
  AnonymousAuthMiddlewareOptions,
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import {
  BaseAddress,
  CustomerSignin,
  MyCustomerDraft,
  MyCustomerUpdateAction,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { authMiddlewareOptions, httpMiddlewareOptions } from './middlewareOptions';
import { userTokenCache } from '../..';

export class User {
  ctpClientCredentialFlow = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  ctpClientFlow = this.ctpClientCredentialFlow;

  constructor() {
    this.setStartUserState();
    this.regainApiPasswordAuthClient();
  }

  setStartUserState() {
    const userState = localStorage.getItem('userState');
    if (userState === null) {
      localStorage.setItem('userState', 'false');
    }
  }

  regainApiPasswordAuthClient() {
    if (
      localStorage.getItem('userTokenStorage') !== null &&
      localStorage.getItem('userState') === 'true'
    ) {
      const refreshTokenStr = localStorage.getItem('userTokenStorage');
      if (refreshTokenStr) {
        const authorization: string = `Bearer ${JSON.parse(refreshTokenStr).token}`;
        const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
          force: true,
        };
        const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
          host: process.env.CTP_AUTH_URL ?? '',
          projectKey: process.env.CTP_PROJECT_KEY ?? '',
          credentials: {
            clientId: process.env.CTP_CLIENT_ID ?? '',
            clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
          },
          refreshToken: JSON.parse(refreshTokenStr).refreshToken,
          tokenCache: userTokenCache,
          fetch,
        };
        this.ctpClientFlow = new ClientBuilder()
          .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
          .withExistingTokenFlow(authorization, existingTokenMiddlewareOptions)
          .withHttpMiddleware(httpMiddlewareOptions)
          .build();
      }
    } else if (
      localStorage.getItem('userTokenStorage') !== null &&
      localStorage.getItem('userState') === 'false'
    ) {
      const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
        host: process.env.CTP_AUTH_URL ?? '',
        projectKey: process.env.CTP_PROJECT_KEY ?? '',
        credentials: {
          clientId: process.env.CTP_CLIENT_ID ?? '',
          clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
          anonymousId: localStorage.getItem('anonymousId') as string,
        },
        scopes: [process.env.CTP_SCOPES ?? ''],
        fetch,
        tokenCache: userTokenCache,
      };
      const refreshTokenStr = localStorage.getItem('userTokenStorage');
      if (refreshTokenStr) {
        const authorization: string = `Bearer ${JSON.parse(refreshTokenStr).token}`;
        const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
          force: true,
        };
        const ctpClientAnonymousFlow = new ClientBuilder()
          .withAnonymousSessionFlow(anonymousMiddlewareOptions)
          .withHttpMiddleware(httpMiddlewareOptions)
          .withExistingTokenFlow(authorization, existingTokenMiddlewareOptions)
          .build();
        this.ctpClientFlow = ctpClientAnonymousFlow;
      }
    }
  }

  async setAnonymousFlow() {
    let anonymousId;
    if (!localStorage.getItem('anonymousId') || localStorage.getItem('anonymousId') === null) {
      anonymousId = this.setAnonymousId();
      if (anonymousId) {
        const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
          host: process.env.CTP_AUTH_URL ?? '',
          projectKey: process.env.CTP_PROJECT_KEY ?? '',
          credentials: {
            clientId: process.env.CTP_CLIENT_ID ?? '',
            clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
            anonymousId,
          },
          scopes: [process.env.CTP_SCOPES ?? ''],
          fetch,
          tokenCache: userTokenCache,
        };

        const ctpClientAnonymousFlow = new ClientBuilder()
          .withAnonymousSessionFlow(anonymousMiddlewareOptions)
          .withHttpMiddleware(httpMiddlewareOptions)
          .build();
        this.ctpClientFlow = ctpClientAnonymousFlow;
      }
    }
  }

  setAnonymousId() {
    const anonymousId = crypto.randomUUID();
    localStorage.setItem('anonymousId', anonymousId);
    return anonymousId;
  }

  createApiPasswordAuthClient(customerData: CustomerSignin) {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: process.env.CTP_AUTH_URL ?? '',
      projectKey: process.env.CTP_PROJECT_KEY ?? '',
      credentials: {
        clientId: process.env.CTP_CLIENT_ID ?? '',
        clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
        user: {
          username: customerData.email,
          password: customerData.password,
        },
      },
      fetch,
      tokenCache: userTokenCache,
    };

    this.ctpClientFlow = new ClientBuilder()
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }

  createApiRoot(ctpClient: Client) {
    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: process.env.CTP_PROJECT_KEY ?? '',
    });
  }

  public async login(customerData: CustomerSignin) {
    const responseObj = {
      email: 'ok',
      password: 'ok',
    };
    this.ctpClientFlow = this.ctpClientCredentialFlow;
    await this.returnUserByEmail(customerData.email)
      .then(async ({ body }) => {
        if (body.results.length === 0) {
          responseObj.email = 'This email address has not been registered.';
        } else {
          this.createApiPasswordAuthClient(customerData);
          const apiRoot = this.createApiRoot(this.ctpClientFlow);
          try {
            userTokenCache.set({
              token: '',
              expirationTime: 0,
              refreshToken: '',
            });
            localStorage.setItem('anonymousId', '');
            await apiRoot.me().login().post({ body: customerData }).execute();

            this.setUserToken(userTokenCache.get());
          } catch (err) {
            responseObj.password = 'Invalid password.';
          }
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    return responseObj;
  }

  public async logout() {
    this.setUserState('false');
    this.ctpClientFlow = this.ctpClientCredentialFlow;
    localStorage.setItem('userTokenStorage', '');
    localStorage.setItem('anonymousId', '');
    userTokenCache.set({
      token: '',
      expirationTime: 0,
      refreshToken: '',
    });
  }

  public async registration(customerData: MyCustomerDraft) {
    const apiRoot = this.createApiRoot(this.ctpClientFlow);
    const responseObj = {
      email: 'ok',
    };
    try {
      await apiRoot
        .me()
        .signup()
        .post({
          body: customerData,
        })
        .execute();
      await this.login({ email: customerData.email, password: customerData.password });
    } catch (error) {
      responseObj.email = (error as Error).message;
    }
    return responseObj;
  }

  returnUserByEmail(customerEmail: string) {
    const apiRoot = this.createApiRoot(this.ctpClientFlow);
    return apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${customerEmail}"`,
        },
      })
      .execute();
  }

  setUserState(status: string) {
    localStorage.setItem('userState', status);
  }

  setUserToken(userToken: TokenStore) {
    localStorage.setItem('userTokenStorage', JSON.stringify(userToken));
  }

  getUser() {
    const apiRoot = this.createApiRoot(this.ctpClientFlow);
    return apiRoot.me().get().execute();
  }

  updateUser(version: number, actions: MyCustomerUpdateAction[]) {
    const apiRoot = this.createApiRoot(this.ctpClientFlow);
    return apiRoot
      .me()
      .post({
        body: { version, actions },
      })
      .execute();
  }

  removeUserAddress(version: number, addressId: string) {
    return this.updateUser(version, [{ action: 'removeAddress', addressId }]);
  }

  updateUserFirstName(version: number, firstName: string) {
    return this.updateUser(version, [{ action: 'setFirstName', firstName }]);
  }

  updateUserLastName(version: number, lastName: string) {
    return this.updateUser(version, [{ action: 'setLastName', lastName }]);
  }

  updateUserEmail(version: number, email: string) {
    return this.updateUser(version, [{ action: 'changeEmail', email }]);
  }

  updateUserDateOfBirth(version: number, dateOfBirth: string) {
    return this.updateUser(version, [{ action: 'setDateOfBirth', dateOfBirth }]);
  }

  updateUserPassword(version: number, currentPassword: string, newPassword: string) {
    const apiRoot = this.createApiRoot(this.ctpClientFlow);
    return apiRoot
      .me()
      .password()
      .post({ body: { currentPassword, newPassword, version } })
      .execute();
  }

  addAddress(
    version: number,
    address: {
      country: 'US';
      city: string;
      streetName: string;
      postalCode: string;
    },
  ) {
    return this.updateUser(version, [{ action: 'addAddress', address }]);
  }

  addBillingType(version: number, addressId: string) {
    return this.updateUser(version, [{ action: 'addBillingAddressId', addressId }]);
  }

  addShippingType(version: number, addressId: string) {
    return this.updateUser(version, [{ action: 'addShippingAddressId', addressId }]);
  }

  setDefaultBillingAddress(version: number, addressId: string) {
    return this.updateUser(version, [{ action: 'setDefaultBillingAddress', addressId }]);
  }

  setDefaultShippingAddress(version: number, addressId: string) {
    return this.updateUser(version, [{ action: 'setDefaultShippingAddress', addressId }]);
  }

  changeAddress(version: number, addressId: string, address: BaseAddress) {
    return this.updateUser(version, [{ action: 'changeAddress', addressId, address }]);
  }

  removeBillingTypeAddress(version: number, addressId: string) {
    return this.updateUser(version, [{ action: 'removeBillingAddressId', addressId }]);
  }

  removeShippingTypeAddress(version: number, addressId: string) {
    return this.updateUser(version, [{ action: 'removeShippingAddressId', addressId }]);
  }
}
