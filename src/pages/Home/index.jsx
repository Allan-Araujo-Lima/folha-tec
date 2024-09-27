import React from 'react';
import { Layout, Carousel, Divider } from 'antd';
import './styles.css';

const { Content } = Layout;

export const Home = () => {
    return (
        <Content className='homeContent'>
            <div className='homeContainer'>
                <div className='introducao'>
                    <h1 className='h1'>Bem-vindo(a) à <b>FolhaTec!</b></h1>
                    <p className='p'>Olá, somos a <b>Folhatec</b>, uma nova empresa que está preparada para revolucionar o mercado
                        de <b>departamento pessoal</b> do <b>Brasil!</b></p>
                </div>
                <Divider />
                <Carousel className="carousel" effect='scrollx' autoplaySpeed={5000} autoplay>
                    <div className="carousel-item">
                        <h3>Missão</h3>
                        <p>Tornar o mercado de departamento pessoal Brasileiro mais ágil e simples.</p>
                    </div>
                    <div className="carousel-item">
                        <h3>Visão</h3>
                        <p>Ser a melhor empresa de Departamento Pessoal do Brasil.</p>
                    </div>
                    <div className="carousel-item">
                        <h3>Valores</h3>
                        <ul>
                            <li>- Agilidade;</li>
                            <li>- Compromisso com o cliente;</li>
                            <li>- Precisão nos processos;</li>
                            <li>- Qualidade.</li>
                        </ul>
                    </div>
                </Carousel>
            </div>
        </Content>
    );
}
