import { useState } from "react"

import { Card, Form, message, Steps, Select, Button, DatePicker, Divider, InputNumber } from "antd"
import dayjs from "dayjs"

import "./styles.css"
import { MonetaryInput } from "../../hooks/inputMask"

let titleAviso = "Tipo de Aviso"

const experiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"];
const semAviso = ["porJustaCausa", "rescisaoContratoExperiencia", "morteEmpregado", experiencia[0], experiencia[1]];

export const Rescisao = () => {
    const [amount, setAmount] = useState("");
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);

    const dataFormat = "DD/MM/YYYY"

    const diferenca = dayjs(form.getFieldValue("dataDemissao"), dataFormat).diff(form.getFieldValue("dataAdmissao"), "days")

    const diasAvisoPrevio = dayjs(form.getFieldValue("dataDemissao"), dataFormat).diff(form.getFieldValue("dataAdmissao"), "year") * 3 + 30

    const dataAvisoPrevio = dayjs(form.getFieldValue("dataDemissao"), dataFormat).add(diasAvisoPrevio, "day")

    const handlerFocus = (e) => {
        if (e.key === "Enter") {
            e.preventDefaut()
            next()
        }
    }

    const next = () => {
        console.log(form.getFieldValue("adicionais"))
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: "Data de admissão",
            description:
                <Form.Item required name={"dataAdmissao"}>
                    <DatePicker format={dataFormat} disabled={current !== 0} onChange={() => next()} />
                </Form.Item>
        },
        {
            title: "Tipo de rescisão",
            description:
                <Form.Item required name={"tipoDeRescisao"}>
                    <Select className="select tipoDeRescisao" disabled={current !== 1} onChange={() => next()}>
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
            title: titleAviso,
            description:
                <Form.Item required name={"tipoDeAviso"}>
                    {
                        semAviso.includes(form.getFieldValue("tipoDeRescisao")) == false ?
                            <Select
                                className="select tipoDeAviso"
                                onFocus={titleAviso = "Tipo de Aviso"}
                                disabled={current !== 2}
                                onChange={() => next()}>
                                <Select.Option value="avisoTrabalhado">Aviso prévio trabalhado</Select.Option>
                                <Select.Option value="avisoIndenizado">Aviso prévio indenizado</Select.Option>
                            </Select>
                            :
                            experiencia.includes(form.getFieldValue("tipoDeRescisao")) == true ?
                                <DatePicker
                                    name="fimPrazoDeterminado"
                                    onFocus={titleAviso = "Prazo final do contrato de experiência"}
                                    format={dataFormat}
                                    minDate={dayjs(form.getFieldValue("dataAdmissao"), dataFormat).add(1, 'day')}
                                    maxDate={dayjs(form.getFieldValue("dataAdmissao"), dataFormat).add(89, 'day')}
                                    disabled={current !== 2}
                                    onChange={() => next()} />
                                :
                                <p> Tipo de rescisão sem aviso prévio.</p>
                    }
                </Form.Item >,
        },
        {
            title: "Comunicado da rescisão",
            description:
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Form.Item required name={"dataDemissao"}>
                        <DatePicker
                            format={dataFormat}
                            minDate={dayjs(form.getFieldValue("dataAdmissao"), dataFormat)}
                            disabled={current !== 3}
                            onChange={() => next()} />
                    </Form.Item>
                    <Form.Item required disabled>
                        {
                            form.getFieldsValue("tipoDeAviso") === "avisoIndenizado" ?
                                <DatePicker name={"dataRescisao"} format={dataFormat} disabled placeholder="" value={form.getFieldValue("dataDemissao")} />
                                :
                                <DatePicker name={"dataRescisao"} format={dataFormat} disabled placeholder="" value={dayjs(form.getFieldValue("dataDemissao"), dataFormat).add(diasAvisoPrevio, "day")} />
                        }
                    </Form.Item>
                </div>
        },
        {
            title: "Categoria do empregado",
            description:
                <Form.Item>
                    <Select disabled={current !== 4}>
                        <Select.Option value="empregado">Empregado</Select.Option>
                        <Select.Option value="domestico">Doméstico</Select.Option>
                        <Select.Option value="aprendiz">Aprendiz</Select.Option>
                    </Select>
                </Form.Item>
        },
        {
            title: "Salário-base",
            description:
                <Form.Item>
                    <MonetaryInput
                        value={amount}
                        onChange={(value) => setAmount(value)}
                        placeholder="0,00"
                        addonBefore="R$"
                        disabled={current !== 5} />
                </Form.Item>
        },
        {
            title: "Adicionais",
            description:
                <div>
                    <Form.Item name="adicionais" required initialValue={"Nenhum"}>
                        <Select id="adicionais" className="adicionais" disabled={current !== 6}>
                            <Select.Option value="">Nenhum</Select.Option>
                            <Select.Option value="insalubridade">Insalubridade</Select.Option>
                            <Select.Option value="periculosidade">Periculosidade</Select.Option>
                        </Select>
                    </Form.Item>
                    {
                        form.getFieldValue("adicionais") == "" ?
                            <div>
                                {
                                    form.getFieldValue("adicionais") == "insalubridade" ?
                                        <Form.Item name="insalubridade" initialValue={20}
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
                                        <Form.Item name="periculosidade" initialValue={30}
                                            style={{ marginLeft: '25px' }}
                                            rules={[{ required: true, message: "Por favor, digite o adicional de periculosidade." },
                                            { type: "number", min: 30, max: 100, message: "O valor do adicinal de periculosidade deve estar entre 10 e 100." }
                                            ]}>
                                            <InputNumber type="number"
                                                addonBefore="I"
                                                addonAfter="%"
                                                style={{ width: '100%' }} />
                                        </Form.Item>
                                }
                            </div>
                            :
                            null
                    }
                </div>
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
        <Card>
            <Form layout="vertical" form={form}>
                <Card title="Simulação de rescisão">
                    <Steps
                        className="steps"
                        direction="vertical"
                        current={current}
                        items={getUpdatedSteps()}>
                    </Steps>
                </Card>
            </Form>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Próximo
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Finalizar
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
            </div>
        </Card>
    )
}