import { useState, useRef } from 'react'
import { Form, Input, Radio, Select, Card, Button, InputNumber, Space } from 'antd'
import './styles.css'

export const HoraExtra = () => {
    const [selectedOption, setSelectecOption] = useState("");
    const [horaExtraResult, setHoraExtraResult] = useState(null);
    const [horas, setHoras] = useState(null);

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
            salarioTotal += (values.salario * values.insalubridade / 100)
        } else if (values.periculosidade) {
            salarioTotal += (values.salario * values.periculosidade / 100)
        }

        let result = salarioTotal / values.horasmes * (values.percentualhorasextras / 100 + 1) * values.horasextras;
        let dsr = result / values.uteis * values.naouteis

        setHoraExtraResult(result)
        setHoras(values.horasextras)
        setDsr(dsr)

        console.log(values.naouteis)
        console.log(result)

    }

    const clear = () => {
        form.resetFields();
    }

    return (
        <div className='content-hora-extra'>
            <Card title="Hora Extra" style={{ maxWidth: 600 }}>
                <Form layout="vertical" onSubmit={submit} onFinish={submit} form={form}>
                    <Form.Item label="Salário base: " name="salario"
                        rules={[{ required: true }]}>
                        <InputNumber type='number' placeholder="Digite seu salário atual"
                            addonBefore="R$"
                            style={{ width: '100%' }} />
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
                            <Form.Item label="Adicional de Insalubridade" name="insalubridade" required initialValue={20}
                                style={{ marginLeft: '25px' }}>
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
                            <Form.Item label="Adicional de Perirculosidade" name="periculosidade" required initialValue={30}
                                style={{ marginLeft: '25px' }}>
                                <InputNumber type="number"
                                    addonBefore="I"
                                    addonAfter="%"
                                    style={{ width: '100%' }} />
                            </Form.Item>
                            :
                            null
                    }
                    <Form.Item label="Horas mês: " name="horasmes" required initialValue={220}>
                        <InputNumber type="number" placeholder="Hora(s)"
                            addonAfter="Horas"
                            style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Percentual horas extras: " name="percentualhorasextras" initialValue={50}
                        rules={[{ required: true }]}>
                        <InputNumber type="number" addonAfter="%"
                            style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Dias úteis" name='uteis' initialValue={25}
                        style={{ display: 'inline-block', width: '50%' }}
                        rules={[{ required: true }, { type: 'number', max: 30, min: 0 }]}
                        onChange={(e) => setDias(e.target.value)}>
                        <InputNumber type="number"
                            style={{ display: 'inline-block', width: 'calc(100% - 16px' }} />
                    </Form.Item>
                    <Form.Item label="Dias não úteis" name='naouteis' initialValue={5}
                        style={{ display: 'inline-block', width: '50%' }}>
                        <InputNumber disabled type="number"
                            style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Quantidade de horas extras: " name='horasextras'
                        rules={[{ required: true }]}>
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
                <Space> </Space>
                {horaExtraResult !== null && (
                    <div className="result">
                        <Card title="Resultado" style={{ maxWidth: 600 }}>
                            <p>O colaborador receberá <b>R$ {horaExtraResult.toFixed(2)}</b> referente a(s) {horas} hora(s) extra trabalhada(s).</p>
                            <p>Além disso, o colaborador receberá <b>R$ {dsr.toFixed(2)}</b> sobre os dias não úteis.</p>
                            <Space> </Space>
                            <h2 style={{ backgroundColor: 'lightgrey' }}><b>Total geral: R${(horaExtraResult + dsr).toFixed(2)}</b></h2>
                        </Card>
                    </div>
                )}
            </Card>
        </div>
    )
}
