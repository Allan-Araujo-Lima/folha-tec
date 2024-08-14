import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LogoMarca from "../../assets/Logomarca.svg"
import './styles.css'

const { Header } = Layout

const items = ['Sobre', 'Calculadoras', 'Contato'].map((key) => ({
    key,
    label: <Link to={`/${key}`}>{key}</Link>,
}));

export const HeaderExp = () => {
    return (
        <Layout className="app-header">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="header">
                    <Link to='/'
                        style={{ display: 'flex', alignSelf: 'center' }}>
                        <img className="header-img" src={LogoMarca} /></Link>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ flex: 1, minWidth: 0 }}
                        items={items}>
                    </Menu>
                </div>
            </Header >
        </Layout >
    );
}