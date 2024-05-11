import fetch from 'node-fetch';

import {
  AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL ?? '',
  projectKey: process.env.CTP_PROJECT_KEY ?? '',
  credentials: {
    clientId: process.env.CTP_CLIENT_ID ?? '',
    clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
  },
  scopes: [process.env.CTP_SCOPES ?? ''],
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.CTP_API_URL ?? '',
  fetch,
};

export const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL ?? '',
  projectKey: process.env.CTP_PROJECT_KEY ?? '',
  credentials: {
    clientId: process.env.CTP_CLIENT_ID ?? '',
    clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
    anonymousId: '1', // - ???????
  },
  scopes: [process.env.CTP_SCOPES ?? ''],
  fetch,
};
