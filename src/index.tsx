import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import { AppRouter } from './controllers/routing/AppRouter';
import { User } from './controllers/api/User';
import { UserTokenCache } from './controllers/api/UserTokenCache';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.append(root);

ReactDOM.createRoot(root).render(<AppRouter />);

export const user = new User();
export const userTokenCache = new UserTokenCache();
