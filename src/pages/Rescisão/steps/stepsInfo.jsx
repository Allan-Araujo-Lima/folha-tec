import { useState } from "react";
import { Form, Steps, Select, Button, DatePicker, Checkbox, Tooltip } from "antd";
import dayjs from "dayjs";
import ".././styles.css";

const experiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"];
const semAviso = ["porJustaCausa", "rescisaoContratoExperiencia", "morteEmpregado", ...experiencia];



export const StepsInfo = ({ info, changeStep }) => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [check, setCheck] = useState(false);

    const dataFormat = "DD/MM/YYYY";

    let diasAvisoPrevio = info?.dataDemissao && info?.dataAdmissao ? dayjs(info.dataDemissao, dataFormat).diff(info.dataAdmissao, "year") * 3 + 30 : 30;

    if (diasAvisoPrevio !== 30 && dayjs(info?.dataAdmissao).add(dayjs(info?.dataDemissao).year() - dayjs(info?.dataAdmissao).year(), "year").isBefore(dayjs(info?.dataDemissao).add(diasAvisoPrevio + 1, "day"))) {
        diasAvisoPrevio += 3;
    };

    if (diasAvisoPrevio > 90) {
        diasAvisoPrevio = 90
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const toggleChecked = () => {
        setCheck(!check);
    };

    const steps = [
        {
            title: "Data de admissão",
            description: (
                <Form.Item name="dataAdmissao" rules={[{ required: true, message: "Por favor, selecione a data de admissão!" }]}>
                    <DatePicker
                        maxDate={info.dataDemissao !== undefined ? dayjs(info?.dataDemissao, dataFormat) : undefined}
                        format={dataFormat}
                        disabled={current !== 0}
                        onChange={() => next()} />
                </Form.Item>
            ),
        },
        {
            title: "Categoria do empregado",
            description: (
                <Form.Item name="categoriaEmpregado" rules={[{ required: true, message: "Por favor, selecione a categoria!" }]}>
                    <Select disabled={current !== 1} onChange={() => next()}>
                        <Select.Option value="empregado">Empregado</Select.Option>
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: "Tipo de rescisão",
            description: (
                <Form.Item name="tipoDeRescisao" rules={[{ required: true, message: "Por favor, selecione o tipo de rescisão!" }]}>
                    <Select disabled={current !== 2} onChange={() => next()} dropdownStyle={{ minWidth: "350px" }}>
                        <Select.Option value="semJustaCausa">Demissão sem justa causa</Select.Option>
                        <Select.Option value="porJustaCausa">Demissão por justa causa</Select.Option>
                        <Select.Option value="pedidoDemissao">Pedido de demissão</Select.Option>
                        <Select.Option value="rescisaoAcordoPartes">Rescisão por acordo entre as partes</Select.Option>
                        <Select.Option value="rescisaoContratoExperiencia">Término de contrato de experiência</Select.Option>
                        <Select.Option value="rescisaoAntecipaContratoExperienciaEmpregador">Término ant. do contrato de experiência</Select.Option>
                        <Select.Option value="rescisaoAntecipaContratoExperienciaEmpregado">Término ant. do contrato de experiência a pedido</Select.Option>
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: !semAviso.includes(info?.tipoDeRescisao) ? "Tipo de aviso" : "Fim do prazo determinado",
            description: (
                <div>
                    {!semAviso.includes(info?.tipoDeRescisao) ? (
                        <Form.Item name="tipoDeAviso">
                            <Select disabled={current !== 3} onChange={() => next()}>
                                <Select.Option value="avisoTrabalhado">Aviso prévio trabalhado</Select.Option>
                                <Select.Option value="avisoIndenizado">Aviso prévio indenizado</Select.Option>
                            </Select>
                        </Form.Item>
                    ) : experiencia.includes(info?.tipoDeRescisao) ? (
                        <Form.Item name="fimPrazoDeterminado">
                            <DatePicker
                                format={dataFormat}
                                minDate={dayjs(info.dataAdmissao, dataFormat).add(1, "day")}
                                maxDate={dayjs(info.dataAdmissao, dataFormat).add(89, "day")}
                                disabled={current !== 3}
                                onChange={() => next()}
                            />
                        </Form.Item>
                    ) : (
                        <p> Tipo de rescisão sem aviso prévio.</p>
                    )}
                </div>
            ),
        },
        {
            title: "Comunicado da rescisão",
            description: (
                <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center", lineHeight: "16px" }}>
                    <Form.Item name="dataDemissao" rules={[{ required: true, message: "Por favor, selecione a data de demissão!" }]}>
                        <DatePicker
                            format={dataFormat}
                            minDate={dayjs(info?.dataAdmissao, dataFormat)}
                            maxDate={experiencia.includes(info?.tipoDeRescisao) ? dayjs(info?.fimPrazoDeterminado, dataFormat).subtract(1, "day") : null}
                            disabled={current !== 4}
                        />
                    </Form.Item>
                    {info.dataDemissao !== undefined && !semAviso.includes(info.tipoDeRescisao) ?
                        <>Aviso prévio<br />{check === false ? diasAvisoPrevio : 30} dias</>
                        : null}
                    <Form.Item>
                        <DatePicker
                            format={dataFormat}
                            disabled
                            value={
                                info.tipoDeAviso === "avisoTrabalhado"
                                    ?
                                    check === false
                                        ? dayjs(info.dataDemissao).add(diasAvisoPrevio, "day")
                                        : dayjs(info.dataDemissao).add(30, "day")
                                    : info.dataDemissao
                            }
                        />
                    </Form.Item>
                </div>
            ),
        },
    ];

    const getUpdatedSteps = () => {
        return steps.map((step, index) => ({
            ...step,
            disabled: index !== current,
            status: index === current ? "process" : "wait",
        }));
    };

    return (
        <div>
            <Steps className="steps" direction="vertical" current={current} items={getUpdatedSteps()} />
            {info.tipoDeRescisao === "semJustaCausa" && info.tipoDeAviso === "avisoTrabalhado" && diasAvisoPrevio > 30 ? (
                <Form.Item name="abled" valuePropName="checked">
                    <Checkbox checked={check} onClick={toggleChecked}>
                        <Tooltip title="Marcar esta opção quando, independentemente da quantidade de anos trabalhados, o aviso trabalhado só será de 30 dias.">
                            Aviso trabalhado de 30 dias e indenizar restante. ({diasAvisoPrevio - 30} dias)
                        </Tooltip>
                    </Checkbox>
                </Form.Item>
            ) : null}
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Próximo
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => changeStep("1")}>
                        Remuneração
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
            </div>
        </div>
    );
};
