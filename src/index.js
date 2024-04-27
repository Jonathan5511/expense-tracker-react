import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'

import '../node_modules/react-bootstrap/dist/react-bootstrap.min'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import AuthProvider from './store/AuthProvider';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
    </Provider>
    

);

