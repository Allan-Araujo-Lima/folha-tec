import { useState } from "react";
import { Card, Space, Form, InputNumber, Button, Select, Table, Layout, Typography } from "antd"

const { Content } = Layout
const { Text } = Typography

import { inss, irrf, dsr, SalarioMinimo } from "../../hooks/index";
import { MonetaryInput, MonetaryOutput } from "../../hooks/inputMask";
import { AvisoCalculo } from "../../components/Avisos";

import "../styles.css"

export const Folha = () => {
    const [amount, setAmount] = useState("");
    const [selectedOption, setSelectecOption] = useState("");
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([]);
    const [result, setResult] = useState(false)

    const setDias = (e) => {
        form.setFieldsValue({ naouteis: (30 - e) });
    };

    const submit = (values) => {
        const list = []
        const listEventos = ["Salário-base", "Insalubridade", "Periculosidade", "DSR", "Pensão Alimentícia", "INSS", "IRRF"]
        let data = []

        let salarioTotal = values.salario;

        if (values.adicionais == "insalubridade") {
            const insalubridade = (SalarioMinimo * values.insalubridade / 100 / 220 * values.horasmes);
            salarioTotal += insalubridade;
        } else if (values.adicionais == "periculosidade") {
            let periculosidade = 0
            values.tiposalario == "por hora" ?
                periculosidade = (values.salario * values.periculosidade / 100 * values.horasmes)
                : periculosidade = (values.salario * values.periculosidade / 100);
            salarioTotal += periculosidade
        };

        values.tiposalario == "por hora" ? salarioTotal = salarioTotal * values.horasmes + dsr(salarioTotal * values.horasmes, values.uteis, values.naouteis) : null;

        const descontoInss = inss(salarioTotal);
        const descontoIrrf = irrf(salarioTotal, values?.dependentesirrf, values?.pensao, descontoInss.inss);

        list.push(values.tiposalario == "por hora" ? values.salario * values.horasmes : values.salario, SalarioMinimo * values.insalubridade / 100 / 220 * values.horasmes, values.salario * values.periculosidade / 100, dsr(values.salario * values.horasmes, values.uteis, values.naouteis), values.pensao, descontoInss.inss, descontoIrrf.irrf)

        let keyNumber = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i] > 0) {
                keyNumber += 1;
                if (listEventos[i] == "Pensão Alimentícia" || listEventos[i] == "INSS" || listEventos[i] == "IRRF") {
                    data.push(
                        {
                            key: keyNumber,
                            evento: listEventos[i],
                            provento: null,
                            desconto: <MonetaryOutput
                                value={list[i]} />,
                            valorDesconto: list[i]
                        }
                    );
                } else {
                    data.push(
                        {
                            key: keyNumber,
                            evento: listEventos[i],
                            provento: <MonetaryOutput
                                value={list[i]} />,
                            desconto: null,
                            valorProvento: list[i]
                        }
                    );
                }
            };
        }
        setTableData(data)
        setResult(true)
    }

    const columns = [
        {
            title: "Evento",
            dataIndex: "evento",
            key: "evento",
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

    const clear = () => {
        form.resetFields();
        setResult(false)
    }

    return (
        <div className="container">
            <Card title="Folha" style={{ maxWidth: 900 }}>
                <Form className="folha-form" layout="vertical" onSubmit={submit} onFinish={submit} form={form}>
                    <Form.Item label="Tipo de Salário" required name="tiposalario" initialValue={"Mensalista"}>
                        <Select className="tiposalario"
                            onChange={(e) => setSelectecOption(e)}
                        >
                            <Select.Option value="">Mensalista</Select.Option>
                            <Select.Option value="por hora">Horista</Select.Option>
                        </Select>
                    </Form.Item>
                    {
                        selectedOption == 'por hora' ?
                            <div>
                                <Form.Item label="Dias úteis" name='uteis' initialValue={25}
                                    style={{ display: 'inline-block', width: '50%' }}
                                    rules={[{ required: true, message: "Por favor, digite os dias úteis do mês." },
                                    { type: 'number', max: 30, min: 0, message: "O valor deve estar entre 0 e 30." }]}
                                    onChange={(e) => setDias(e.target.value)}
                                >
                                    <InputNumber type="number"
                                        style={{ display: 'inline-block', width: 'calc(100% - 16px' }}
                                        onStep={setDias} />
                                </Form.Item>
                                <Form.Item label="Dias não úteis" name='naouteis' initialValue={5}
                                    style={{ display: 'inline-block', width: '50%' }}>
                                    <InputNumber disabled type="number"
                                        style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                            :
                            null
                    }
                    <Form.Item label={selectedOption == "por hora" ? "Salário por hora" : "Salário"} name="salario"
                        rules={[{ required: true, message: "Por favor, digite o salário base." },
                        { type: 'number', min: 1, message: "O valor do salário base deve ser maior do que 0." }]}>
                        <MonetaryInput
                            value={amount}
                            onChange={(value) => setAmount(value)}
                            placeholder="0,00"
                            addonBefore="R$" />
                    </Form.Item>
                    <Form.Item label="Adicionais" name="adicionais" required initialValue={"Nenhum"}>
                        <Select id="adicionais" className="adicionais" onChange={(e) => setSelectecOption(e)}>
                            <Select.Option value="">Nenhum</Select.Option>
                            <Select.Option value="insalubridade">Insalubridade</Select.Option>
                            <Select.Option value="periculosidade">Periculosidade</Select.Option>
                        </Select>
                    </Form.Item>
                    {
                        selectedOption == 'insalubridade' ?
                            <Form.Item label="Adicional de Insalubridade" name="insalubridade" initialValue={20}
                                style={{ marginLeft: '25px' }}
                                rules={[{ required: true, message: "Por favor, digite o adicional de insalubridade." },
                                { type: "number", min: 10, max: 100, message: "O valor do adicinal de insalubridade deve estar entre 10 e 100." }
                                ]}>
                                <InputNumber type="number"
                                    addonBefore="I"
                                    addonAfter="%"
                                    style={{ width: '100%' }} />
                            </Form.Item>
                            :
                            null
                    }
                    {
                        selectedOption == 'periculosidade' ?
                            <Form.Item label="Adicional de Perirculosidade" name="periculosidade" initialValue={30}
                                style={{ marginLeft: '25px' }}
                                rules={[{ required: true, message: "Por favor, digite o adicional de periculosidade." },
                                { type: "number", min: 30, max: 100, message: "O valor do adicinal de periculosidade deve estar entre 10 e 100." }
                                ]}>
                                <InputNumber type="number"
                                    addonBefore="I"
                                    addonAfter="%"
                                    style={{ width: '100%' }} />
                            </Form.Item>
                            :
                            null
                    }
                    <Form.Item label="Horas mês" name="horasmes" initialValue={220}
                        rules={[{ required: true, message: "Por favor, digite a quantidade de horas mês." },
                        { type: "number", min: 1, max: 744, message: "O valor deve estar entre 1 e 744." }]}>
                        <InputNumber type="number" placeholder="Hora(s)"
                            addonAfter="Horas"
                            style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Filhos menores de 14 anos" name="filhos"
                        initialValue={0}
                        style={{ display: 'inline-block', width: '50%' }}>
                        <InputNumber type="number"
                            style={{ display: 'inline-block', width: 'calc(100% - 16px' }} />
                    </Form.Item>
                    <Form.Item label="Dep. imposto de renda" name="dependentesirrf"
                        initialValue={0}
                        style={{ display: 'inline-block', width: '50%' }}>
                        <InputNumber type="number"
                            style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Pensão alimentícia" name="pensao" initialValue={0}>
                        <MonetaryInput
                            value={amount}
                            onChange={(value) => setAmount(value)}
                            placeholder="0,00"
                            addonBefore="R$" />
                    </Form.Item>
                    <Space>
                        <Button type='primary' htmlType='submit' className="calculate-btn">
                            Calcular
                        </Button>
                        <Button htmlType='button' onClick={clear}>
                            Limpar
                        </Button>
                    </Space>
                </Form>
            </Card>
            {result !== false && (
                <div className="result">
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
                                            <Table.Summary.Cell index={0} align="start">Total</Table.Summary.Cell>
                                            <Table.Summary.Cell index={1}><Text>{<MonetaryOutput value={totalProventos} />}</Text></Table.Summary.Cell>
                                            <Table.Summary.Cell index={2}><Text>{<MonetaryOutput value={totalDescontos} />}</Text></Table.Summary.Cell>
                                        </Table.Summary.Row>
                                        <Table.Summary.Row style={{ textAlign: "center", fontSize: "18px" }}>
                                            <Table.Summary.Cell index={0}>Total líquido</Table.Summary.Cell>
                                            <Table.Summary.Cell index={1} colSpan={2}>R$ {<MonetaryOutput value={totalProventos - totalDescontos} />}</Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </>
                                )
                            }} />
                    </Card>
                </div>
            )}
            <AvisoCalculo />
        </div >
    )
}