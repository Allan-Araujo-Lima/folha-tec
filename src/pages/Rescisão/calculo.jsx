import { useState, useEffect } from "react"

import { Card, Divider, Table, Tooltip, Typography } from "antd"
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Text } = Typography

import { rescisao } from "../../hooks/rescisao";
import { MonetaryOutput } from "../../hooks/inputMask"

export const Calculo = ({ info }) => {

    const [tableData, setTableData] = useState([]);
    const [tableDataFgts, setTableDataFgts] = useState([]);

    const submit = () => {

        let result = rescisao(info)

        setTableData(result.data)
        setTableDataFgts(result.dataFgts)
    }

    useEffect(() => {
        submit();
    }, []);

    const columns = [
        {
            title: "Evento",
            dataIndex: "evento",
            key: "evento",
        },
        {
            title: "Referência",
            dataIndex: "referencia",
            key: "referencia",
            align: "center"
        },
        {
            title: "Provento (R$)",
            dataIndex: "provento",
            key: "provento",
            align: "center"
        },
        {
            title: "Desconto (R$)",
            dataIndex: "desconto",
            key: "desconto",
            align: "center"
        },
    ];

    const columnsFgts = [
        {
            title: "Tipo",
            dataIndex: "tipo",
            key: "tipo",
        },
        {
            title: "Base de Cálculo",
            dataIndex: "base",
            key: "base",
            align: "center"
        },
        {
            title: "Alíquota",
            dataIndex: "aliquota",
            key: "aliquota",
            align: "center"
        },
        {
            title: "Valor (R$)",
            dataIndex: "valor",
            key: "valor",
            align: "center"
        }
    ];

    return (
        <div>
            <Card title="Resultado">
                <Table columns={columns} dataSource={tableData} pagination={false}
                    summary={(pageData) => {
                        let totalProventos = 0;
                        let totalDescontos = 0;
                        pageData.forEach(({ valorProvento, valorDesconto }) => {
                            totalProventos += valorProvento ? valorProvento : 0;
                            totalDescontos += valorDesconto ? valorDesconto : 0;
                        }
                        );
                        return (
                            <>
                                <Table.Summary.Row style={{ textAlign: "center", fontSize: "16px" }}>
                                    <Table.Summary.Cell index={0} colSpan={2}>Total</Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}><Text><MonetaryOutput value={totalProventos} /></Text></Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}><Text><MonetaryOutput value={totalDescontos} /></Text></Table.Summary.Cell>
                                </Table.Summary.Row>
                                <Table.Summary.Row style={{ textAlign: "center", fontSize: "18px" }}>
                                    <Table.Summary.Cell index={0} colSpan={2}>Total líquido</Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} colSpan={2}>R$ <MonetaryOutput value={totalProventos - totalDescontos} /></Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }} />
            </Card>
            <Divider />
            <Card title="FGTS">
                <Table columns={columnsFgts} dataSource={tableDataFgts} pagination={false}
                    summary={(fgtsData) => {
                        let totalFgts = 0;
                        fgtsData.forEach(({ valorSoma }) => {
                            totalFgts += valorSoma;
                        }
                        );
                        return (
                            <>
                                <Table.Summary.Row style={{ textAlign: "center", fontSize: "18px" }}>
                                    <Table.Summary.Cell index={0} colSpan={3}>Total FGTS<Tooltip title='Para o cálculo correto da multa rescisória, o preenchimento do "Saldo do FGTS"
                                    deve ser preenchido.'>
                                        <QuestionCircleOutlined style={{ marginLeft: "6px", color: "rgba(0, 0, 0, 0.45)" }} />
                                    </Tooltip></Table.Summary.Cell>
                                    <Table.Summary.Cell index={3} colSpan={3}>R$ <MonetaryOutput value={totalFgts} /></Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        )
                    }} />
            </Card>
        </div>
    )
}