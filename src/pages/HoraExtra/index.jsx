import { useState } from 'react'
import { Form, Select, Card, Button, InputNumber, Space } from 'antd'
import { MonetaryInput, MonetaryOutput } from '../../hooks/inputMask'

import './styles.css'

export const HoraExtra = () => {
    const [selectedOption, setSelectecOption] = useState("");
    const [horaExtraResult, setHoraExtraResult] = useState(null);
    const [horas, setHoras] = useState(null);
    const [amount, setAmount] = useState("")

    const setDias = (e) => {
        switch (e) {
            default:
                form.setFieldsValue({ naouteis: (30 - e) });
        }
    };

    const [dsr, setDsr] = useState(0);
    const [form] = Form.useForm();

    const submit = (values) => {

        let salarioTotal = values.salario;

        if (values.insalubridade) {
            salarioTotal += (1412 * values.insalubridade / 100)
        } else if (values.periculosidade) {
            salarioTotal += (values.salario * values.periculosidade / 100)
        }

        let result = salarioTotal / values.horasmes * (values.percentualhorasextras / 100 + 1) * values.horasextras;
        let dsr = result / values.uteis * values.naouteis

        setHoraExtraResult(result)
        setHoras(values.horasextras)
        setDsr(dsr)

    }

    const clear = () => {
        form.resetFields();
    }

    return (
        <div className='container-hora-extra'>
            <div className='content-hora-extra'>
                <Card title="Hora Extra">
                    <Form layout="vertical" onSubmit={submit} onFinish={submit} form={form}>
                        <Form.Item label="Salário base" name="salario"
                            initialValue={0}
                            rules={[{ required: true, message: "Por favor, digite o salário base." }]}>
                            <MonetaryInput
                                placeholder="Digite seu salário atual"
                                addonBefore="R$"
                                style={{ width: '100%' }}
                                value={amount}
                                step={"0,00"} />
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
                        <Form.Item label="Horas mês" name="horasmes" initialValue={220}
                            rules={[{ required: true, message: "Por favor, digite a quantidade de horas mês" },
                            { type: "number", min: 1, max: 744, message: "O valor deve estar entre 1 e 744" }]}>
                            <InputNumber type="number" placeholder="Hora(s)"
                                addonAfter="Horas"
                                style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Percentual horas extras" name="percentualhorasextras" initialValue={50}
                            rules={[{ required: true, message: "Por favor, digite o percentual de horas extras." },
                            { type: 'number', min: 1, message: "O valor deve ser maior do que 0." }
                            ]}>
                            <InputNumber type="number" addonAfter="%"
                                style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Dias úteis" name='uteis' initialValue={25}
                            style={{ display: 'inline-block', width: '50%' }}
                            rules={[{ required: true, message: "Por favor, digite os dias úteis do mês." },
                            { type: 'number', max: 30, min: 0, maxLength: 2, message: "O valor deve estar entre 0 e 30." }]}
                            onChange={(e) => setDias(e.target.value)}>
                            <InputNumber type="number"
                                style={{ display: 'inline-block', width: 'calc(100% - 16px' }}
                                max={30}
                                onChange={setDias}
                                precision={0}
                                onStep={setDias} />
                        </Form.Item>
                        <Form.Item label="Dias não úteis" name='naouteis' initialValue={5}
                            style={{ display: 'inline-block', width: '50%' }}>
                            <InputNumber disabled type="number"
                                style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Quantidade de horas extras: " name='horasextras'
                            rules={[{ required: true, message: "Por favor, digitar quantidade de horas extras." },
                            { type: "number", min: 1, message: "O valor deve ser maior do que 0." }
                            ]}>
                            <InputNumber type="number"
                                addonAfter="Horas"
                                style={{ width: '100%' }} />
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
                {horaExtraResult !== null && (
                    <div className="result">
                        <Space> </Space>
                        <Card title="Resultado" style={{ maxWidth: 800 }}>
                            <p>O colaborador receberá <b>R$ {<MonetaryOutput value={horaExtraResult} />}</b> referente a(s) {horas} hora(s) extra(s) trabalhada(s).</p>
                            <p>Além disso, o colaborador receberá <b>R$ {<MonetaryOutput value={dsr} />}</b> sobre os dias não úteis.</p>
                            <Space> </Space>
                            <h2 style={{ backgroundColor: 'lightgrey' }}><b>Total geral: R$ {<MonetaryOutput value={(horaExtraResult + dsr)} />}</b></h2>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
