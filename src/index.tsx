import './styles/index.css';
import '@components/calcite-components';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';
import { CalculatorPage } from '@components/CalculatorPage/CalculatorPage';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import {
    PATH_ABOUT_PAGE,
    PATH_CALCULATOR_PAGE,
    PATH_HOME_PAGE,
} from '@constants/router';
import { HomePage } from '@components/HomePage/HomePage';
import { AboutPage } from '@components/AboutPage/AboutPage';

const router = createHashRouter([
    {
        path: PATH_HOME_PAGE,
        element: <HomePage />,
    },
    {
        path: PATH_CALCULATOR_PAGE,
        element: <CalculatorPage />,
    },
    // {
    //     path: '/download',
    //     element: <Download />,
    // },
    {
        path: PATH_ABOUT_PAGE,
        element: <AboutPage />,
    },
]);

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <ReduxProvider store={configureAppStore(preloadedState)}>
            <AppContextProvider>
                <RouterProvider router={router} />
            </AppContextProvider>
        </ReduxProvider>
    );
})();
