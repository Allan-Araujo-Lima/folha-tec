import React from 'react';
import { Link } from 'react-router-dom';

import "./styles.css"


export const Calculadoras = () => {

    return (
        <div>
            <a>Folha de Pagamento</a>
            <Link to='/calculadoras/hora-extra'>Hora Extra</Link>
            <a>Adicional Noturno</a>
        </div>
    )
}