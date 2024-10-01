import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LogoMarca from "../../assets/Logomarca.svg"
import './styles.css'

const { Header } = Layout;

const items = ['Sobre', 'Calculadoras', 'Contato'].map((key) => ({
    key,
    label: <Link className='link' to={`/${key.toLowerCase()}`}>{key}</Link>,
}));

export const HeaderExp = () => {
    return (
        <Header className="header">
            <Link to='/' className='link'>
                <img className="header-img" src={LogoMarca} alt="Logo" />
            </Link>
            <Menu
                theme="dark"
                mode="horizontal"
                items={items}
            />
        </Header>
    );
}
