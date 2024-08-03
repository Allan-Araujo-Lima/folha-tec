import { useState } from "react";
import { Card, Space, Form, InputNumber, Button, Select, Table } from "antd"
import "./styles.css"
import { inss, irrf, dsr } from "../../hooks/index";

export const Folha = () => {

    const [selectedOption, setSelectecOption] = useState("");
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([]);

    const setDias = (e) => {
        form.setFieldsValue({ naouteis: (30 - e) });
    };

    const submit = (values) => {
        let salarioTotal = values.salario;

        if (values.adicionais == "insalubridade") {
            salarioTotal += (1412 * values.insalubridade / 100)
        } else if (values.adicionais == "periculosidade") {
            salarioTotal += (values.salario * values.periculosidade / 100)
        };

        values.tiposalario == "por hora" ? salarioTotal = salarioTotal * values.horasmes + dsr(salarioTotal * values.horasmes, values.uteis, values.naouteis) : null;

        const descontoInss = inss(salarioTotal);
        const descontoIrrf = irrf(salarioTotal, values.dependentesirrf, values.pensaoalimenticia);

        const valorLiquido = salarioTotal - descontoInss - descontoIrrf;

        const data = [
            {
                key: 1,
                evento: "Salário-Base",
                provento: values.salario,
                desconto: 0
            }
        ];

        setTableData(data)
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
        },
        {
            title: "Desconto (R$)",
            dataIndex: "desconto",
            key: "desconto",
        },
    ];

    return (
        <div className="content-folha">
            <Card title="Folha" style={{ maxWidth: 800 }}>
                <Form layout="vertical" onSubmit={submit} onFinish={submit} form={form}>
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
                    <Form.Item label={`Salário ${selectedOption}`} name="salario"
                        initialValue={0}
                        rules={[{ required: true, message: "Por favor, digite o salário base." },
                        { type: 'number', min: 1, message: "O valor do salário base deve ser maior do que 0." }]}>
                        <InputNumber type='number' placeholder="Digite seu salário atual"
                            addonBefore="R$"
                            style={{ width: '100%' }}
                            step={"0.00"}
                        />
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
                    <Form.Item label="Filhos/enteados menores de 14 anos" name="filhos"
                        initialValue={0}
                        style={{ display: 'inline-block', width: '50%' }}>
                        <InputNumber type="number"
                            style={{ display: 'inline-block', width: 'calc(100% - 16px' }} />
                    </Form.Item>
                    <Form.Item label="Dependentes imposto de renda" name="dependentesirrf"
                        initialValue={0}
                        style={{ display: 'inline-block', width: '50%' }}>
                        <InputNumber type="number"
                            style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Pensão alimentícia" name="pensaoalimenticia" initialValue={0}>
                        <InputNumber type="number"
                            addonBefore="R$"
                            style={{ width: '100%' }}>
                        </InputNumber>
                    </Form.Item>
                    <Space>
                        <Button type='primary' htmlType='submit' className="calculate-btn">
                            Calcular
                        </Button>
                        <Button htmlType='button'>
                            Limpar
                        </Button>
                    </Space>
                </Form>
                <Table columns={columns} dataSource={tableData} pagination={false} />
            </Card>
        </div >
    )
}