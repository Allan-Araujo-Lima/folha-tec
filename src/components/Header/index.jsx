import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LogoMarca from "../../assets/Logomarca.svg"
import './styles.css'

const { Header } = Layout

const items = ['Sobre', 'Calculadoras', 'Contato'].map((key) => ({
    key,
    label: <Link className='link' to={`/${key}`}>{key}</Link>,
}));

export const HeaderExp = () => {
    return (
        <Layout className="app-header">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <Link to='/'
                    style={{ display: 'flex', alignSelf: 'center' }}>
                    <img className="header-img" src={LogoMarca} /></Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items}>
                    style={{ flex: 1, minWidth: 1 }}
                </Menu>
            </Header >
        </Layout >
    );
}