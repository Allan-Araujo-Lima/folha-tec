import { useState } from 'react';
import { Form, Select, Card, Button, InputNumber, Space } from 'antd';
import { MonetaryInput, MonetaryOutput } from '../../hooks/inputMask';
import './styles.css';
import { AvisoCalculo } from '../../components/Avisos';

export const HoraExtra = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [horaExtraResult, setHoraExtraResult] = useState(null);
    const [horas, setHoras] = useState(null);
    const [amount, setAmount] = useState("");
    const [dsr, setDsr] = useState(0);
    const [form] = Form.useForm();

    const setDias = (e) => form.setFieldsValue({ naouteis: 30 - e });

    const submit = (values) => {
        let salarioTotal = values.salario;
        if (values.insalubridade) {
            salarioTotal += 1412 * (values.insalubridade / 100);
        } else if (values.periculosidade) {
            salarioTotal += values.salario * (values.periculosidade / 100);
        }
        const result = (salarioTotal / values.horasmes) * ((values.percentualhorasextras / 100) + 1) * values.horasextras;
        const dsr = (result / values.uteis) * values.naouteis;

        setHoraExtraResult(result);
        setHoras(values.horasextras);
        setDsr(dsr);
    };

    const clear = () => form.resetFields();

    return (
        <div className="container-hora-extra">
            <div className="content-hora-extra">
                <Card title="Hora Extra">
                    <Form layout="vertical" onFinish={submit} form={form}>
                        <Form.Item
                            label="Salário base"
                            name="salario"
                            initialValue={0}
                            rules={[{ required: true, message: "Por favor, digite o salário base." }]}
                        >
                            <MonetaryInput
                                placeholder="Digite seu salário atual"
                                addonBefore="R$"
                                value={amount}
                                step="0,00"
                            />
                        </Form.Item>

                        <Form.Item label="Adicionais" required>
                            <Select
                                defaultValue="Nenhum"
                                onChange={(e) => setSelectedOption(e)}
                                className="adicionais"
                            >
                                <Select.Option value="">Nenhum</Select.Option>
                                <Select.Option value="insalubridade">Insalubridade</Select.Option>
                                <Select.Option value="periculosidade">Periculosidade</Select.Option>
                            </Select>
                        </Form.Item>

                        {selectedOption === 'insalubridade' && (
                            <Form.Item
                                label="Adicional de Insalubridade"
                                name="insalubridade"
                                initialValue={20}
                                rules={[
                                    { required: true, message: "Por favor, digite o adicional de insalubridade." },
                                    { type: "number", min: 10, max: 100, message: "O valor deve estar entre 10 e 100." }
                                ]}
                            >
                                <InputNumber addonAfter="%" style={{ width: '100%' }} />
                            </Form.Item>
                        )}

                        {selectedOption === 'periculosidade' && (
                            <Form.Item
                                label="Adicional de Periculosidade"
                                name="periculosidade"
                                initialValue={30}
                                rules={[
                                    { required: true, message: "Por favor, digite o adicional de periculosidade." },
                                    { type: "number", min: 30, max: 100, message: "O valor deve estar entre 30 e 100." }
                                ]}
                            >
                                <InputNumber addonAfter="%" style={{ width: '100%' }} />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="Horas mês"
                            name="horasmes"
                            initialValue={220}
                            rules={[
                                { required: true, message: "Por favor, digite a quantidade de horas mês" },
                                { type: "number", min: 1, max: 744, message: "O valor deve estar entre 1 e 744" }
                            ]}
                        >
                            <InputNumber addonAfter="Horas" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            label="Percentual horas extras"
                            name="percentualhorasextras"
                            initialValue={50}
                            rules={[
                                { required: true, message: "Por favor, digite o percentual de horas extras." },
                                { type: 'number', min: 1, message: "O valor deve ser maior do que 0." }
                            ]}
                        >
                            <InputNumber addonAfter="%" style={{ width: '100%' }} />
                        </Form.Item>

                        <div className='hora-dsr'>
                            <div>

                                <Form.Item
                                    label="Dias úteis"
                                    name="uteis"
                                    initialValue={25}
                                    rules={[
                                        { required: true, message: "Por favor, digite os dias úteis do mês." },
                                        { type: 'number', min: 0, max: 30, message: "O valor deve estar entre 0 e 30." }
                                    ]}
                                >
                                    <InputNumber max={30} onChange={(value) => setDias(value)} precision={0} />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Dias não úteis"
                                    name="naouteis"
                                    initialValue={5}
                                >
                                    <InputNumber disabled />
                                </Form.Item>
                            </div>
                        </div>

                        <Form.Item
                            label="Quantidade de horas extras"
                            name="horasextras"
                            rules={[
                                { required: true, message: "Por favor, digitar quantidade de horas extras." },
                                { type: "number", min: 1, message: "O valor deve ser maior do que 0." }
                            ]}
                        >
                            <InputNumber addonAfter="Horas" style={{ width: '100%' }} />
                        </Form.Item>

                        <Space style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                            <Button type="primary" htmlType="submit" className="calculate-btn">
                                Calcular
                            </Button>
                            <Button htmlType="button" onClick={clear}>
                                Limpar
                            </Button>
                        </Space>
                    </Form>
                </Card>

                {horaExtraResult !== null && (
                    <div className="result">
                        <Card title="Resultado" style={{ maxWidth: 800 }}>
                            <p>
                                O colaborador receberá <b>R$ <MonetaryOutput value={horaExtraResult} /></b> referente a(s) {horas} hora(s) extra(s) trabalhada(s).
                            </p>
                            <p>
                                Além disso, o colaborador receberá <b>R$ <MonetaryOutput value={dsr} /></b> sobre os dias não úteis.
                            </p>
                            <h2 style={{ backgroundColor: 'lightgrey' }}>
                                <b>Total geral: R$ <MonetaryOutput value={horaExtraResult + dsr} /></b>
                            </h2>
                        </Card>
                    </div>
                )}
            </div>
            <AvisoCalculo />
        </div>
    );
};
