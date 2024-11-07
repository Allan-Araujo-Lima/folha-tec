import { Link } from "react-router-dom";
import { Layout } from "antd";
const { Footer } = Layout;

import instagram from "../../assets/instagram.svg";
import email from "../../assets/emailwhite.svg";
import phone from "../../assets/phonewhite.svg";
import logo from "../../assets/Logomarca.svg";
import "./styles.css";

export const FooterExp = () => {
    return (
        <Footer className="footer">
            <div className="footer-section logo-section">
                <Link to="/" reloadDocument={true}>
                    <img className="logo" src={logo} alt="Logo" />
                </Link>
            </div>
            <div className="footer-section contacts">
                <div className="contact-item">
                    <a href="https://www.instagram.com/folha.tec/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram" />
                    </a>
                    <span><a href="https://www.instagram.com/folha.tec/" target="_blank" rel="noopener noreferrer">@folha.tec</a></span>
                </div>
                <div className="contact-item">
                    <a href="mailto: folhatec@gmail.com?subject=Preciso de ajuda com minha empresa&body=Olá Folhatec, gostaria de impulsionar o departamento pessoal da minha empresa..." target="_blank" rel="noopener noreferrer">
                        <img src={email} alt="Email" />
                    </a>
                    <span><a href="mailto: folhatec@gmail.com?subject=Preciso de ajuda com minha empresa&body=Olá Folhatec, gostaria de impulsionar o departamento pessoal da minha empresa..." target="_blank" rel="noopener noreferrer">folhatec@gmail.com</a></span>
                </div>
                <div className="contact-item">
                    <img src={phone} alt="Phone" />
                    <span>(88) 98878-0988</span>
                </div>
            </div>
            <div className="footer-section me">
                <p>FolhaTec © {new Date().getFullYear()} Created by <a href="https://www.linkedin.com/in/allan-araujo-lima/" target="_blank" rel="noopener noreferrer"><b>Allan Araujo</b></a></p>
            </div>
            <div className="footer-section politicas">
                <Link to="/politica-de-privacidade" reloadDocument={true}><span>Política de Privacidade</span></Link>
                <Link to="/termo-de-uso" reloadDocument={true}><span>Termos de uso</span></Link>
            </div>
        </Footer>
    );
};
