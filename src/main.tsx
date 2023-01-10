import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { themeColors } from './theme/colors';

import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './api/Firebase/init';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
