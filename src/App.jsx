import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';
import { Sobre } from "./pages/Sobre";
import { LayoutExp } from './pages/Layout';
import { HoraExtra } from './pages/HoraExtra';
import { Calculadoras } from './pages/Calculadoras';
import { Contato } from './pages/Contato';
import { Folha } from './pages/Folha';
import { AdicionalNoturno } from './pages/AdicionalNoturno'
import { Rescisao } from './pages/Rescisão';

import './globals/styles.css'

function App() {

    const pages = createBrowserRouter([
        {
            path: "/",
            element: <LayoutExp />,
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
                    path: "/calculadoras/folha",
                    element: <Folha />
                },
                {
                    path: "/calculadoras/adicional-noturno",
                    element: <AdicionalNoturno />
                },
                {
                    path: "/calculadoras/rescisao",
                    element: <Rescisao />
                },
                {
                    path: "/sobre",
                    element: <Sobre />
                },
                {
                    path: "/contato",
                    element: <Contato />
                }
            ]
        },

    ])
    return (<RouterProvider router={pages} />);
}

export default App;