import React from 'react';
import './styles.css'

export const Home = () => {

    return (
        <div className='introducao'>
            <h1 className='h1'>Bem-vindo(a) à <b>Folhatec!</b></h1>
            <></>
            <p className='p'>Olá, somos a <b>Folhatec</b>, uma nova empresa que está preparada para revolucionar o mercado
                de <b>departamento pessoal</b> do <b>Brasil!</b></p>
            <div className='carrossel' data-ride='carrossel'>
                <ol
                    className='carrossel-indicators'>
                    <li data-target='carrossel' data-slide-to='0' className='active'></li>
                    <li data-target='carrossel' data-slide-to='1'></li>
                    <li data-target='carrossel' data-slide-to='2'></li>
                </ol>
                <div className='carrossel-inner'>
                    <div className='carrossel-item active'>
                        <div>
                            <h1>teste 1</h1>
                        </div>
                    </div>
                    <div className='carrossel-item'>
                        <div>
                            <h1>teste 2</h1>
                        </div>
                    </div>
                    <div className='carrossel-item'>
                        <div>
                            <h1>teste 3</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
