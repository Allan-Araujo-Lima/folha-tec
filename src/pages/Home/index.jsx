import React from 'react';
import { Layout, Carousel } from 'antd';
import './styles.css';

const { Content } = Layout;

export const Home = () => {
    return (
        <Layout>
            <Content style={{ padding: '20px 50px' }}>
                <div className='introducao'>
                    <h1 className='h1'>Bem-vindo(a) à <b>FolhaTec!</b></h1>
                    <p className='p'>Olá, somos a <b>Folhatec</b>, uma nova empresa que está preparada para revolucionar o mercado
                        de <b>departamento pessoal</b> do <b>Brasil!</b></p>
                </div>
                <Carousel className="carousel" effect='scrollx' autoplaySpeed={5000}>
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
            </Content>
        </Layout>
    );
}

