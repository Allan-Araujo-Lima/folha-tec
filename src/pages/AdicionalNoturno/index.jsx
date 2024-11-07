import { Card, Form, InputNumber, Layout, Select, Space, Button } from "antd"

import { useState } from "react";

import { MaskedInput, MonetaryInput } from "../../hooks/inputMask";
import { AvisoCalculo } from "../../components/Avisos";
import "../styles.css"

const { Content } = Layout;

export const AdicionalNoturno = () => {

    const [selectedOption, setSelectecOption] = useState("");
    const [form] = Form.useForm();
    const [amount, setAmount] = useState("");
    const [adicionalNoturnoResult, setAdicionalNoturnoResult] = useState(false);
    const [horaNoturna, setHoraNoturna] = useState("")

    const setMin = (e) => {
        let novoValor = e.target.value;

        if (novoValor.length > 1) {
            const ultimosDois = novoValor.slice(-2)

            if (parseInt(ultimosDois, 10) > 59) {
                novoValor = novoValor.slice(0, -2) + 59;
                form.setFieldsValue({ horasnoturnas: (novoValor) })
            };
        };
    };

    const setZeros = (e) => {
        let zeros = String(parseInt(e.target.value));

        if (zeros.length < 5) {
            zeros = String(zeros).padEnd(5, "0");
        }
        form.setFieldsValue({ horasnoturnas: (zeros) })
    }

    const submit = async (values) => {


        await form.validateFields();

        let salarioTotal = values.salario;
        let horas = values.horasnoturnas.split(":");
        horas = (parseInt(horas[0]) + (parseInt(horas[1]) / 60)) * 1.1429;

        if (values.insalubridade) {
            const insalubridade = (1412 * values.insalubridade / 100);
            salarioTotal += insalubridade;
        } else if (values.periculosidade) {
            const periculosidade = (values.salario * values.periculosidade / 100);
            salarioTotal += periculosidade;
        };

        const base = salarioTotal * values.percentual / 100 / values.horasmes;

        const result = base * horas;

        horas = String(horas).split(".")
        const b = (horas[1]).slice(0, 2)

        horas = (parseInt(horas[0]) + (b * 6 / 1000))
        horas = String(horas.toFixed(2)).split(".")

        setAdicionalNoturnoResult(result)
        setHoraNoturna(horas)
    };

    const clear = () => {
        form.resetFields();
        setAdicionalNoturnoResult(false)
    }

    return (
        <div className="container">
            <nav className="nav-container">
                <p>
                    Nessa calculadora você poderá calcular o adicional noturno devido para um funcionário que trabalha em horário noturno.
                </p>
            </nav>
            <Card title="Adicional Noturno">
                <Form layout="vertical" onSubmit={submit} onFinish={submit} form={form}>
                    <Form.Item label="Salário base" name="salario" required
                        rules={[{ required: true, message: "Por favor, digite o salário base." }]}>
                        <MonetaryInput
                            value={amount}
                            onChange={(value) => setAmount(value)}
                            placeholder="0,00"
                            addonBefore="R$" />
                    </Form.Item>
                    <Form.Item label="Adicionais" required>
                        <Select defaultValue={"Nenhum"} id="adicionais" className="adicionais" onChange={(e) => setSelectecOption(e)}>
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
                                ]}
                            >
                                <InputNumber type="number"
                                    addonBefore="I"
                                    addonAfter="%" />
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
                    <Form.Item label="Percentual adicional noturno" name="percentual" required
                        rules={[{ required: true, message: "Por favor, digite o percentual de adicional noturno." }]}>
                        <InputNumber type="number"
                            addonAfter="%"
                            style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Horas noturnas (Horas relógio)" name="horasnoturnas" required
                        rules={[{ required: true, message: "Por favor, digite a quantidade de horas." },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value) {
                                    return Promise.resolve();
                                }
                                if (value && !getFieldValue("horasmes")) {
                                    return Promise.reject(new Error('O campo de Horas Mês deve estar preenchido.'));
                                }
                                let [horas = 0, minutos = 0] = value.replaceAll(" ", "").trim().split(":").map(v => v ? parseInt(v) : 0);
                                let horasTotais = getFieldValue("horasmes");
                                if (horas > horasTotais || (horas >= horasTotais && minutos > 0)) {
                                    return Promise.reject(new Error('O campo de horas noturnas deve ser menor ou igual o número de horas mês.'));
                                }
                                return Promise.resolve();
                            },
                        })]}>
                        {
                            <MaskedInput
                                onChange={setMin}
                                onPressEnter={setZeros}
                                value={amount}
                            />
                        }
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
            {adicionalNoturnoResult !== false && (
                <div className="result">
                    <Card title="Resultado" style={{ maxWidth: 800 }}>
                        <p>O colaborador receberá <b>R$ {adicionalNoturnoResult.toFixed(2)}</b> referente a(s) {horaNoturna[0]}:{horaNoturna[1]} hora(s) noturnas(s) </p>
                        <Space> </Space>
                        <h2 style={{ backgroundColor: 'lightgrey' }}><b>Total geral: R$ {(adicionalNoturnoResult).toFixed(2)}</b></h2>
                    </Card>
                </div>
            )}
            <AvisoCalculo />
        </div>
    )
}
