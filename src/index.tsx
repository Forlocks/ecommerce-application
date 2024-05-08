import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './pages/loginPage/loginPage';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.append(root);

// Рендерим компонент LoginPage внутри элемента с id 'root'
ReactDOM.render(<LoginPage />, document.getElementById('root'));