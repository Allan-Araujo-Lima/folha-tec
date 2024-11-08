import React from 'react';
import { Link } from 'react-router-dom';
import { Flex } from 'antd';
import { SnippetsOutlined, PlusOutlined, MoonOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';

import "./styles.css"

export const Calculadoras = () => {

    return (
        <div className='container'>
            <h1>Calculadoras</h1>
            <p>Nesta aba você poderia encontrar diversas calculadoras para a conferência das mais diversas verbas trabalhistas de sua empresa!</p>
            <Flex className='boxStyle'
                justify='space-evenly'
                align='center'
                wrap>
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
                <Link to='/calculadoras/rescisao'>
                    <div className='card'>
                        <div className='img'>
                            <UsergroupDeleteOutlined
                                style={{ fontSize: '20px' }} />
                        </div>
                        <div className='calc'>
                            <a>
                                Rescisão
                            </a>
                        </div>
                    </div>
                </Link>
                {/*                     
                    <Link to='/calculadoras/custo-por-empregado'>
                        <div className='card'>
                            <div className='img'>
                                <DollarOutlined
                                    style={{ fontSize: '20px' }} />
                            </div>
                            <div className='calc'>
                                <a>
                                    Custo por empregado
                                </a>
                            </div>
                        </div>
                    </Link>
                    <Link to='/calculadoras/ferias'>
                        <div className='card'>
                            <div className='img'>
                                <SunOutlined
                                    style={{ fontSize: '20px' }} />
                            </div>
                            <div className='calc'>
                                <a>
                                    Férias
                                </a>
                            </div>
                        </div>
                    </Link> */}
            </Flex>
        </div>
    )
}