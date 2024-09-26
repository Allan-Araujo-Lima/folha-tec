import { useState } from "react"

import { Card, Layout, Form, message, Steps, Select, Button, DatePicker } from "antd"

import "./styles.css"

const { Content } = Layout

const semAviso = ["porJustaCausa", "rescisaoContratoExperiencia", "morteEmpregado"]

export const Rescisao = () => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [tipoRescisao, setTipoRescisao] = useState("")

    const next = () => {
        setTipoRescisao(form.getFieldValue("tipoDeRescisao"));
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: "Tipo de rescisão",
            description:
                <Form.Item required name={"tipoDeRescisao"}>
                    <Select className="select tipoDeRescisao">
                        <Select.Option value="semJustaCausa">Demissão sem justa causa</Select.Option>
                        <Select.Option value="porJustaCausa">Demissão por justa causa</Select.Option>
                        <Select.Option value="pedidoDemissao">Pedido de demissão</Select.Option>
                        <Select.Option value="rescisaoCulpaReciproca">Rescisão por culpa recíproca</Select.Option>
                        <Select.Option value="rescisaoCulpaEmpregador">Rescisão indireta (culpa do empregador)</Select.Option>
                        <Select.Option value="rescisaoAcordoPartes">Rescisão por acordo entre as partes</Select.Option>
                        <Select.Option value="rescisaoContratoExperiencia">Rescisão por término de contrato de experiência</Select.Option>
                        <Select.Option value="rescisaoAntecipaContratoExperienciaEmpregador">Rescisão por término antecipado de contrato de experiência</Select.Option>
                        <Select.Option value="rescisaoAntecipaContratoExperienciaEmpregado">Rescisão por término antecipado de contrato de experiência a pedido</Select.Option>
                        <Select.Option value="morteEmpregado">Rescisão por falecimento do empregado</Select.Option>
                        <Select.Option value="morteEmpregador">Rescisão por falecimento do empregador individual</Select.Option>
                    </Select>
                </Form.Item>
        },
        {
            title: "Tipo de aviso",
            description:
                <Form.Item required>
                    {
                        semAviso.includes(tipoRescisao) == false ?
                            <Select className="select tipoDeAviso">
                                <Select.Option value="avisoTrabalhado">Aviso prévio trabalhado</Select.Option>
                                <Select.Option value="avisoIndenizado">Aviso prévio indenizado</Select.Option>
                            </Select>
                            :
                            <p> Tipo de rescisão sem aviso prévio.</p>
                    }
                </Form.Item >,
        },
        {
            title: "Data do comunicado da rescisão",
            description:
                <Form.Item required>
                    <DatePicker format={"DD/MM/YYYY"}>

                    </DatePicker>
                </Form.Item>
        }
    ]

    const getUpdatedSteps = () => {
        return steps.map((step, index) => {
            if (index === current) {
                return { ...step, disabled: false, status: "process" };
            } else {
                return { ...step, disabled: true, status: "wait" };
            }
        });
    };

    return (
        <Content>
            <Card>
                <Form layout="vertical" form={form}>
                    <Steps
                        className="steps"
                        direction="vertical"
                        current={current}
                        items={getUpdatedSteps()}>
                    </Steps>
                </Form>
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </Card>
        </Content>
    )
}