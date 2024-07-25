import { Outlet } from "react-router-dom";

import { HeaderExp } from '../../components/Header'

import './styles.css'

export const Layout = () => {

    return (
        <div className="layout-container">
            <HeaderExp />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}