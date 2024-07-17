import React from 'react';
import { Link } from 'react-router-dom';

import LogoMarca from "../../assets/Logomarca.svg"

import './styles.css'

export const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <img className="header-img" src={LogoMarca} />
            </Link>
            <nav>
                <Link to="/sobre">Sobre Nós</Link>
                <Link to="/calculadoras">Calculadoras</Link>
                <Link to="/contato">Contato</Link>
            </nav>
        </div>
    );
}