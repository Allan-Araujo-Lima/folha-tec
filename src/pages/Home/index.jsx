import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Divider, Card } from 'antd';

import "./styles.css"

const contentStyle = {
    margin: '34px',
    height: '250px',
    color: '#fff',
    background: '#364d79',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: "12px",
    fontSize: "16px"
};

export const Home = () => {
    return (
        <div className='home-container'>
            <div>
                <h1>Bem-vindo(a) à <b>FolhaTec!</b></h1>
                <p>Olá, somos a <b>Folhatec</b>, uma nova empresa que está preparada para revolucionar o mercado
                    de <b>departamento pessoal</b> do <b>Brasil!</b></p>
            </div>
            <Divider />
            <Carousel className="carousel" effect='scrollx' autoplay autoplaySpeed={5000}>
                <div>
                    <div style={contentStyle}>
                        <h3>Missão</h3>
                        <p>
                            Tornar o mercado de departamento pessoal Brasileiro mais ágil e
                            simples.
                        </p>
                    </div>
                </div>
                <div >
                    <div style={contentStyle}>
                        <h3>Visão</h3>
                        <p>Ser a melhor empresa de Departamento Pessoal do Brasil.</p>
                    </div>
                </div>
                <div>
                    <div style={contentStyle}>
                        <h3>Valores</h3>
                        <ul>
                            <li> Agilidade;</li>
                            <li> Compromisso com o cliente;</li>
                            <li> Precisão nos processos;</li>
                            <li> Qualidade.</li>
                        </ul>
                    </div>
                </div>
            </Carousel>
            <section className='servicos'>
                <h2>Nossos serviços</h2>
                <div className='servicos-card'>
                    <Card
                        title="Folha de Pagamento">
                        <p>
                            Tercerização de toda a rotina do departamento pessoal
                            de sua empresa ou da sua folha de pagamento pessoa física!
                        </p>
                    </Card>
                    <Link to={"/calculadoras"}>
                        <Card
                            title="Cálculos Trabalhistas">
                            <p>
                                Ficou com dúvida em alguma particulariedade?<br />
                                Quer saber se sua empresa está realizando os pagamento corretamente?<br />
                                Tudo isso fica fácil com a nossa ferramenta de cálculos trabalhistas, confira clicando no nosso card.
                            </p>
                        </Card>
                    </Link>
                    <Card
                        title="Auditoria">
                        <p>
                            Quer a rotina do departamento pessoal da sua empresa segura e sem dores de cabeça futuras?<br />
                            Contrate a nossa auditoria especializada e deixe a rotina do departamento pessoal
                            de sua empresa mais segura e confiável.
                        </p>
                    </Card>
                </div>
            </section>
        </div >
    );
}
