import React, { useRef, useState, useEffect } from 'react';
import { Layout, List } from 'antd';
import './styles.css';

const { Content } = Layout;

export const Home = () => {
    const [currentItem, setCurrentItem] = useState(1);
    const itemsRef = useRef([]);

    useEffect(() => {
        const items = document.querySelectorAll('.item');
        itemsRef.current = items;
        check();
    }, []);

    const maxItems = itemsRef.current.length;

    function check() {
        itemsRef.current.forEach((item) => item.classList.remove('active'));

        if (itemsRef.current[currentItem]) {
            itemsRef.current[currentItem].scrollIntoView({
                inline: "center",
                behavior: "smooth"
            });
            itemsRef.current[currentItem].classList.add('active');
        }
    }

    function left() {
        setCurrentItem((prevItem) => {
            const newItem = prevItem > 0 ? prevItem - 1 : maxItems - 1;
            return newItem;
        });
    }

    function right() {
        setCurrentItem((prevItem) => {
            const newItem = prevItem < maxItems - 1 ? prevItem + 1 : 0;
            return newItem;
        });
    }

    useEffect(() => {
        check();
    }, [currentItem]);

    return (
        <Layout>
            <Content style={{ padding: '0 48px' }}>
                <div className='introducao'
                    style={{
                        background: '#ffffff',
                        minHeight: 280,
                        padding: 24,
                        borderRadius: '30px',
                    }}>
                    <h1 className='h1'>Bem-vindo(a) à <b>FolhaTec!</b></h1>
                    <p className='p'>Olá, somos a <b style={{ color: 'red' }}>Folhatec</b>, uma nova empresa que está preparada para revolucionar o mercado
                        de <b>departamento pessoal</b> do <b>Brasil!</b></p>
                    <div className='carrossel' data-ride='carrossel'>
                        <button className='arrow-left control' aria-label='Previous' onClick={left}>◀︎</button>
                        <button className='arrow-right control' aria-label='Next' onClick={right}>▶︎</button>
                        <div className='carrossel-wrapper'>
                            <div className='carrossel-inner'>
                                <div className='carrossel-item item'>
                                    <h1 className='carrossel-h1'>Missão</h1>
                                    <p className='carrossel-p'>Tornar o mercado de departamento pessoal Brasileiro mais ágil e simples.</p>
                                </div>
                                <div className='carrossel-item item active'>
                                    <h1 className='carrossel-h1'>Visão</h1>
                                    <p className='carrossel-p'>Ser a melhor empresa de Departamento Pessoal do Brasil.</p>
                                </div>
                                <div className='carrossel-item item'>
                                    <h1 className='carrossel-h1'>Valores</h1>
                                    <p className='carrossel-p'>
                                        - Agilidade;<br />
                                        - Compromisso com o cliente;<br />
                                        - Precisão nos processos;<br />
                                        - Foco no cliente.<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
