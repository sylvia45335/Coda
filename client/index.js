import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import './public/styles.css';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <App />
    }
]);

root.render(
        <RouterProvider router={router} ></RouterProvider>
)