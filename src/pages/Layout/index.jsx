import { Outlet } from 'react-router-dom';
import { HeaderExp } from '../../components/Header'
import { FooterExp } from "../../components/Footer";

import './styles.css'

export const LayoutExp = () => {

    return (
        <div className="layout-container">
            <HeaderExp />
            <div className="content">
                <Outlet />
            </div>
            <FooterExp />
        </div>
    )
}