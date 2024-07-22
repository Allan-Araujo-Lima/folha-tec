import { useState, useRef } from 'react'
import { Form, Input, Radio, Select, Card, Button } from 'antd'
import './styles.css'
import { useForm } from 'antd/es/form/Form'

export const HoraExtra = () => {
    const [selectedOption, setSelectecOption] = useState("");
    const [horaExtraResult, setHoraExtraResult] = useState(null);
    const [horas, setHoras] = useState(null);
    const setDias = (value) => {
        form.setFieldValue({ naouteis: 30 - value })
    }
    const [dsr, setDsr] = useState(0);
    const [form] = Form.useForm();

    const submit = (values) => {

        let salarioTotal = values.salario;

        if (values.insalubridade) {
            salarioTotal += (values.salario * values.insalubridade / 100)
        } else if (values.periculosidade) {
            salarioTotal += Number(values.salario * values.periculosidade / 100)
        }

        let result = salarioTotal / values.cargahoraria * (values.horaextra / 100 + 1) * values.quantidadehoras;
        let dsr = result / values.quantidadediasuteis * values.quantidadediasnaouteis

        setHoraExtraResult(result)
        setHoras(values.quantidadehoras)
        setDsr(dsr)

        console.log(result)

    }

    return (
        <div className='content-hora-extra'>
            <Card title="Hora Extra" style={{ maxWidth: 600 }}>
                <Form layout="vertical" onSubmit={submit} onFinish={submit} form={form} type="number">
                    <Form.Item label="Salário base: " name="salario" rules={[{ required: true }]}>
                        <Input type='number' placeholder="Digite seu salário atual" />
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
                            <Form.Item label="Adicional de Insalubridade" name="insalubridade" required initialValue={20}>
                                <Input type="number" />
                            </Form.Item>
                            :
                            null
                    }
                    {
                        selectedOption == 'periculosidade' ?
                            <Form.Item label="Adicional de Perirculosidade" name="periculosidade" required initialValue={30}>
                                <Input type="number" />
                            </Form.Item>
                            :
                            null
                    }
                    <Form.Item label="Horas mês: " name="horas-mes" required initialValue={220}>
                        <Input type="number" placeholder="Hora(s)" />
                    </Form.Item>
                    <Form.Item label="Horas extras: " name="horas-extras" rules={[{ required: true }]} initialValue={50}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Dias úteis" name='uteis' initialValue={20} rules={[{ max: 25 }, { required: true }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        onChange={console.log("oiii")}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Dias não úteis" name='naouteis' initialValue={5} style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }} >
                        <Input type="number" />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className="calculate-btn">
                        Calcular
                    </Button>
                </Form>
                {horaExtraResult !== null && (
                    <div className="result">
                        <h1>Resultado</h1>
                        <p>O colaborador receberia <b>R$ {horaExtraResult.toFixed(2)}</b> referente a(s) {horas} hora(s) extra trabalhadas.</p>
                        <></>
                        <p>Além disso, o colaborador receberá <b>R$ {dsr.toFixed(2)}</b> sobre os dias não úteis.</p>
                        <></>
                        <p><b>Total geral: R${(horaExtraResult + dsr).toFixed(2)}</b>.</p>
                    </div>
                )}
            </Card>
        </div>
    )
}
