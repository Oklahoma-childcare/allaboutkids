import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import './index.css';

hydrateRoot(document.getElementById('root')!, <React.StrictMode><RouterProvider router={router}/></React.StrictMode>);
