import { Client, ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  anonymousMiddlewareOptions,
  authMiddlewareOptions,
  httpMiddlewareOptions,
} from './MiddlewareOptions';

// ----------------------ERROR HANDLER START--------------------
function errorHandler(error: Error) {
  console.error(error.message);
}
// ----------------------ERROR HANDLER END----------------------

export class User {
  public isLogin: boolean = false;

  ctpClientCredentialFlow = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  ctpClientAnonymousFlow = new ClientBuilder()
    .withAnonymousSessionFlow(anonymousMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  ctpClientFlow = this.ctpClientCredentialFlow;

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
      scopes: [`manage_my_profile:${process.env.CTP_PROJECT_KEY}`], // скорее всего убрать
      fetch,
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
    this.createApiPasswordAuthClient(customerData);
    const apiRoot = this.createApiRoot(this.ctpClientFlow);
    try {
      await apiRoot.me().login().post({ body: customerData }).execute();
      this.isLogin = true;
    } catch (err) {
      errorHandler(err as Error);
    }
  }

  public async logout() {
    this.isLogin = false;
    this.ctpClientFlow = this.ctpClientCredentialFlow;
  }

  public async registration(customerData: MyCustomerDraft) {
    const apiRoot = this.createApiRoot(this.ctpClientFlow);

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
      errorHandler(error as Error);
    }
  }
}

export const user = new User();
