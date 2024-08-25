import { Card, Form, InputNumber, Layout, Select, Space, Button } from "antd"

import { useState } from "react";

import { MaskedInput, MonetaryInput } from "../../hooks/inputMask";
import "./styles.css"

const { Content } = Layout;

export const AdicionalNoturno = () => {

    const [selectedOption, setSelectecOption] = useState("");
    const [form] = Form.useForm();
    const [amount, setAmount] = useState("");

    const submit = (values) => {
        let salarioTotal = values.salario;
        let horas = values.horasnoturnas;
        console.log(horas)
        horas = horas.split(":")
        horas = horas[0] + horas[1] / 100 * 60
        console.log(horas)

        if (values.adicionais == "insalubridade") {
            const insalubridade = (1412 * values.insalubridade / 100);
            salarioTotal += insalubridade;
        } else if (values.adicionais == "periculosidade") {
            const periculosidade = (values.salario * values.periculosidade / 100);
            salarioTotal += periculosidade;
        };

        const base = salarioTotal * values.percentual / 100 / 220;

    };

    const clear = () => {
        form.resetFields();
        setResult(false)
    }

    return (
        <Content>
            <div className="content-noturno">
                <Card title="Adicional Noturno">
                    <Form layout="vertical" onSubmit={submit} onFinish={submit} form={form}>
                        <Form.Item label="Salário base" name="salario">
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
                        <Form.Item label="Percentual adicional noturno" name="percentual" required
                            rules={[{ required: true, message: "Por favor, digite o percentual de adicional noturno." }]}>
                            <InputNumber type="number"
                                addonAfter="%"
                                style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Horas noturnas (Horas relógio)" name="horasnoturnas" required
                            rules={[{ required: true, message: "Por favor, digite a quantidade de horas." },
                            ]}>
                            <MaskedInput mask="999:99" placeholder="000:00" addonAfter="Hora(s)" />
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
            </div>
        </Content >
    )
}

// ^\d{3}:\d{2}$
