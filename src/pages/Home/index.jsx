import React from 'react';
import { Layout, Carousel, Divider } from 'antd';

const { Content } = Layout;

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
        <div className='homeContainer'>
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
        </div>
    );
}
