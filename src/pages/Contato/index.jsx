import { Card, Divider } from "antd"

import instagram from "../../assets/instagram.svg"
import email from "../../assets/email.svg"
import phone from "../../assets/phone.svg"
import "./styles.css"

export const Contato = () => {
    return (
        <div className="contato-container">
            < h1 >Contato</h1 >
            <Card title="Entre em contatno conosco">
                <nav>Aqui você descobre como pode entrar em contato conosco de maneira simples.</nav>
                <Divider />
                <section className="contato-content">
                    <div>
                        <a href="https://www.instagram.com/folha.tec/" target="_blank">
                            <img src={instagram} />
                        </a>
                        <span>Instagram: <a href="https://www.instagram.com/folha.tec/" target="_blank">@folha.tec</a></span>
                    </div>
                    <div>
                        <a href="mailto: folhatec@gmail.com?subject=Preciso de ajuda com minha empresa?body=Olá Folhatec, gostaria de impulsionar
                                o departamento pessoal da minha empresa..."
                            target="_blank">
                            <img src={email} />
                        </a>
                        <span>Email:
                            <a href="mailto: folhatec@gmail.com?subject=Preciso de ajuda com minha empresa?body=Olá Folhatec, gostaria de impulsionar
                                    o departamento pessoal da minha empresa..."
                                target="_blank">folhatec@gmail.com</a>
                        </span>
                    </div>
                    <div>
                        <a>
                            <img src={phone} />
                        </a>
                        <span>Telefone: (88) 98878-0988</span>
                    </div>
                </section>
            </Card>
        </div>
    )
}
