import { useState } from "react"

import { Card, Form, message, Steps, Select, Button, DatePicker, Divider, Checkbox } from "antd"
import dayjs from "dayjs"

import "./styles.css"
import { StepsRem } from "./steps"

let titleAviso = "Tipo de Aviso"

const experiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"];
const semAviso = ["porJustaCausa", "rescisaoContratoExperiencia", "morteEmpregado", experiencia[0], experiencia[1]];

export const Rescisao = () => {
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
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: "Data de admissão",
            description:
                <div>
                    <Form.Item required name={"dataAdmissao"}>
                        <DatePicker format={dataFormat} disabled={current !== 0} onChange={() => next()} />
                    </Form.Item>
                </div>

        },
        {
            title: "Categoria do empregado",
            description:
                <Form.Item>
                    <Select
                        onChange={() => next()}
                        disabled={current !== 1}>
                        <Select.Option value="empregado">Empregado</Select.Option>
                        <Select.Option value="domestico">Doméstico</Select.Option>
                        <Select.Option value="aprendiz">Aprendiz</Select.Option>
                    </Select>
                </Form.Item>
        },
        {
            title: "Tipo de rescisão",
            description:
                <Form.Item required name={"tipoDeRescisao"}>
                    <Select
                        className="select tipoDeRescisao"
                        disabled={current !== 2}
                        onChange={() => next()}
                    >
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
                                disabled={current !== 3}
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
                                    disabled={current !== 3}
                                    onChange={() => next()} />
                                :
                                <p> Tipo de rescisão sem aviso prévio.</p>
                    }
                </Form.Item >,
        },
        {
            title: "Comunicado da rescisão",
            description:
                <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center", lineHeight: "16px" }}>
                    <Form.Item required name={"dataDemissao"}>
                        <DatePicker
                            format={dataFormat}
                            minDate={dayjs(form.getFieldValue("dataAdmissao"), dataFormat)}
                            disabled={current !== 4}
                        />
                    </Form.Item>
                    {
                        form.getFieldValue("dataDemissao") !== undefined && !semAviso.includes(form.getFieldValue("tipoDeRescisao")) ?
                            `${diasAvisoPrevio} dias`
                            :
                            null
                    }
                    <Form.Item
                        required
                        disabled>
                        {
                            form.getFieldsValue("tipoDeAviso") !== "avisoTrabalhado" ?
                                <DatePicker name={"dataRescisao"} format={dataFormat} disabled placeholder="" value={form.getFieldValue("dataDemissao")} />
                                :
                                <DatePicker name={"dataRescisao"} format={dataFormat} disabled placeholder="" value={dayjs(form.getFieldValue("dataDemissao"), dataFormat).add(diasAvisoPrevio, "day")} />
                        }
                    </Form.Item>
                </div>,
        },
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
                <Card title="Informações rescisão">
                    <Steps
                        className="steps"
                        direction="vertical"
                        current={current}
                        items={getUpdatedSteps()}>
                    </Steps>
                    {
                        form.getFieldValue("tipoDeRescisao") == "semJustaCausa" && form.getFieldValue("tipoDeAviso") == "avisoTrabalhado" && diasAvisoPrevio > 30 ?
                            <Checkbox>
                                Aviso trabalho de 30 dias e indenizar restante.
                            </Checkbox>
                            :
                            null
                    }
                    <div style={{ marginTop: 24 }}>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Próximo
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => setCurrent(0)}>
                                Remuneração
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Anterior
                            </Button>
                        )}
                    </div>
                </Card>
                <Divider />
                <StepsRem />
            </Form>
        </Card>
    )
}