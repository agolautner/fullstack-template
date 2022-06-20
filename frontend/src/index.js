import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { CounterProvider } from './providers/counter';
import { AuthProvider } from './providers/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
    <CounterProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CounterProvider>
    </AuthProvider>
);
