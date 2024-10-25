import React from 'react';
import { Typography, Layout, List, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const { Content } = Layout;

export const Politica = () => {
    return (
        <Layout style={{ backgroundColor: '#E9EFFF' }}>
            <Content style={{ padding: '50px', maxWidth: '800px', margin: 'auto' }}>
                <Typography>
                    <Title level={2} style={{ color: '#203165' }}>Política de Privacidade</Title>

                    <Paragraph>
                        <Text style={{ color: '#4DS891' }}>
                            A sua privacidade é importante para nós. É política do <strong>FolhaTec</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <Link href="https://folhatec.site/" target="_blank">FolhaTec</Link>, e outros sites que possuímos e operamos.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas <Link href="https://politicaprivacidade.com/" target="_blank">políticas de privacidade</Link>.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                        </Text>
                    </Paragraph>

                    <Divider />

                    <Title level={3} style={{ color: '#203165' }}>Compromisso do Usuário</Title>

                    <List
                        bordered
                        dataSource={[
                            "A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;",
                            "B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica ou qualquer tipo de pornografia ilegal, apologia ao terrorismo ou contra os direitos humanos;",
                            "C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do FolhaTec, seus fornecedores ou terceiros."
                        ]}
                        renderItem={item => (
                            <List.Item style={{ backgroundColor: '#BBC2FF', color: '#203165' }}>
                                {item}
                            </List.Item>
                        )}
                    />

                    <Divider />

                    <Paragraph>
                        <Text style={{ color: '#203165' }}>
                            Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza, geralmente é mais seguro deixar os cookies ativados.
                        </Text>
                    </Paragraph>

                    <Paragraph>
                        <Text style={{ color: '#4DS891' }}>
                            Esta política é efetiva a partir de 24 October 2024 02:24.
                        </Text>
                    </Paragraph>
                </Typography>
            </Content>
        </Layout>
    );
}
