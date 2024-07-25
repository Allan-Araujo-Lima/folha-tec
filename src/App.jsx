import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';
import { Sobre } from "./pages/Sobre";
import { Layout } from './pages/Layout';
import { HoraExtra } from './pages/HoraExtra';
import { Calculadoras } from './pages/Calculadoras';
import { Contato } from './pages/Contato';

import './globals/styles.css'

function App() {

    const pages = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/calculadoras",
                    element: <Calculadoras />
                },
                {
                    path: "/calculadoras/hora-extra",
                    element: <HoraExtra />
                },
                {
                    path: "/sobre",
                    element: <Sobre />
                },
                {
                    path: "contato",
                    element: <Contato />
                }
            ]
        },

    ])
    return (<RouterProvider router={pages} />);
}

export default App;