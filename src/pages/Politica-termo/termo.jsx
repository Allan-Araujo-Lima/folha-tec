import React from 'react';
import { Typography, Layout, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

export const TermosDeUso = () => {
    return (
        <Layout style={{ backgroundColor: '#E9EFFF' }}>
            <Content style={{ padding: '50px', maxWidth: '800px', margin: 'auto' }}>
                <Typography>
                    <Title level={2} style={{ color: '#203165' }}>Termos de Uso</Title>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            O uso do site <strong>FolhaTec</strong> implica a aceitação dos seguintes termos. Recomendamos que o usuário leia atentamente antes de utilizar qualquer serviço.
                        </Text>
                    </Paragraph>

                    <Title level={3} style={{ color: '#203165' }}>Responsabilidade do Usuário</Title>

                    <Paragraph>
                        <Text style={{ color: '#4DS891' }}>
                            O usuário é inteiramente responsável pelas informações fornecidas ao site. Ao utilizar o <strong>FolhaTec</strong>, o usuário concorda em fornecer dados corretos e verdadeiros, garantindo a precisão das informações inseridas nos formulários e cálculos disponíveis na plataforma.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            Qualquer dano ou prejuízo causado por informações incorretas fornecidas pelo usuário será de responsabilidade exclusiva do próprio usuário, isentando o <strong>FolhaTec</strong> de qualquer responsabilidade.
                        </Text>
                    </Paragraph>

                    <Divider />

                    <Title level={3} style={{ color: '#203165' }}>Finalidade dos Cálculos</Title>

                    <Paragraph>
                        <Text style={{ color: '#4DS891' }}>
                            Os cálculos realizados através das ferramentas disponíveis no <strong>FolhaTec</strong> têm apenas caráter consultivo. Não devem ser utilizados como uma base legal ou definitiva para tomadas de decisão.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            O <strong>FolhaTec</strong> não se responsabiliza por qualquer ação tomada com base nos cálculos ou informações geradas pelo site. É recomendado que o usuário consulte um profissional especializado antes de tomar qualquer decisão baseada nos resultados obtidos.
                        </Text>
                    </Paragraph>

                    <Divider />

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            Ao continuar a usar o site <strong>FolhaTec</strong>, o usuário reconhece e concorda com os termos acima mencionados.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#4DS891' }}>
                            Estes Termos de Uso são efetivos a partir de 24 October 2024.
                        </Text>
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
    );
};
