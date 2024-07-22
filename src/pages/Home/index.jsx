import React, { useRef, useState, useEffect } from 'react';
import './styles.css';

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
        <div className='introducao'>
            <h1 className='h1'>Bem-vindo(a) à <b>Folhatec!</b></h1>
            <p className='p'>Olá, somos a <b>Folhatec</b>, uma nova empresa que está preparada para revolucionar o mercado
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
                            <p className='carrossel-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ex nemo cum fugit doloremque nisi hic autem veritatis delectus, natus sunt eligendi voluptas sint, dolorum doloribus veniam dolores earum omnis.</p>
                        </div>
                        <div className='carrossel-item item'>
                            <h1 className='carrossel-h1'>Valores</h1>
                            <p className='carrossel-p'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat est sapiente ipsam. Atque repellendus itaque mollitia corporis consectetur. Et amet molestias officia similique necessitatibus natus repellat tempora. Nulla, nesciunt libero.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
