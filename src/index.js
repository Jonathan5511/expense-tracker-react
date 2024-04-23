import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import '../node_modules/react-bootstrap/dist/react-bootstrap.min'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import AuthProvider from './store/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>

);

