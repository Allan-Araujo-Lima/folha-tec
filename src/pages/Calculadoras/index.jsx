import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { SnippetsOutlined, PlusOutlined, MoonOutlined } from '@ant-design/icons';

import "./styles.css"

const { Content } = Layout;

export const Calculadoras = () => {

    return (
        <Content>
            <div className='container'
                style={{
                    background: '#ffffff',
                    minHeight: 280,
                    padding: 24,
                    borderRadius: '30px',
                }}>
                <Link to='/calculadoras/folha'>
                    <div className='card'>
                        <div className='img'>
                            <SnippetsOutlined
                                style={{ fontSize: '20px' }} />
                        </div>
                        <div className='calc'>
                            <a>
                                Folha de Pagamento
                            </a>
                        </div>
                    </div>
                </Link>
                <Link to='/calculadoras/hora-extra'>
                    <div className='card'>
                        <div className='img'>
                            <PlusOutlined
                                style={{ fontSize: '20px' }} />
                        </div>
                        <div className='calc'>
                            <a>
                                Hora Extra
                            </a>
                        </div>
                    </div>
                </Link>
                <Link to='/calculadoras/adicional-noturno'>
                    <div className='card'>
                        <div className='img'>
                            <MoonOutlined
                                style={{ fontSize: '20px' }} />
                        </div>
                        <div className='calc'>
                            <a>
                                Adicional Noturno
                            </a>
                        </div>
                    </div>
                </Link>
            </div>
        </Content>
    )
}