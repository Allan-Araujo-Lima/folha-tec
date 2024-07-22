import { Outlet } from "react-router-dom";

import { Header } from '../../components/Header'

import './styles.css'

export const Layout = () => {

    return (
        <div className="layout-container">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}