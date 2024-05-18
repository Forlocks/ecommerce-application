import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import {
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  anonymousMiddlewareOptions,
  authMiddlewareOptions,
  httpMiddlewareOptions,
} from './middlewareOptions';
import { userTokenCache } from '../..';

export class User {
  ctpClientCredentialFlow = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  ctpClientAnonymousFlow = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousMiddlewareOptions)
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
    if (localStorage.getItem('userState') === 'true') {
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
    }
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
      scopes: [`manage_my_profile:${process.env.CTP_PROJECT_KEY}`],
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
            await apiRoot.me().login().post({ body: customerData }).execute();
            this.setUserState('true');
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
      this.login({ email: customerData.email, password: customerData.password });
    } catch (error) {
      // errorHandler(error as Error);
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

  // getCustomer() {
  //   const apiRoot = this.createApiRoot(this.ctpClientFlow);
  //   return apiRoot.me().get().execute();
  // }
}
