import {
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { authMiddlewareOptions, httpMiddlewareOptions } from './middlewareOptions';

// ----------------------ERROR HANDLER START--------------------
function errorHandler(error: Error) {
  console.error(error.message);
}
// ----------------------ERROR HANDLER END----------------------

// ---------------------START CREATE clientCredentialsFlow ------

export function createClientCredentialsFlow() {
  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY ?? '',
  });

  // --test
  const getProduct = () => apiRoot.products().get().execute();
  getProduct().then(console.log).catch(console.error);
}

// ---------------------END CREATE clientCredentialsFlow------

// ---------------------START LOGIN USER ---------------------------

export async function loginCustomer(customerData: CustomerSignin) {
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

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY ?? '',
  });

  try {
    await apiRoot.me().login().post({ body: customerData }).execute();
  } catch (err) {
    errorHandler(err as Error);
  }
}

// ---------------------END LOGIN USER ---------------------------

// ---------------------START REGISTRATION USER ------------------

export async function registrationCustomer(customerData: MyCustomerDraft) {
  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: process.env.CTP_PROJECT_KEY ?? '',
  });

  try {
    await apiRoot
      .me()
      .signup()
      .post({
        body: customerData,
      })
      .execute();
    loginCustomer({ email: customerData.email, password: customerData.password });
  } catch (error) {
    errorHandler(error as Error);
  }
}

// ---------------------END REGISTRATION USER ------------------
