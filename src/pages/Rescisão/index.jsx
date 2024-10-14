import { useState } from "react"

import { Card, Form, Divider, Button, Collapse } from "antd"
import dayjs from "dayjs"

import { StepsRem } from "./steps/stepsRem"
import { StepsFerias } from "./steps/stepsFerias"
import { StepsInfo } from "./steps/stepsInfo"
import { StepsDecimo } from "./steps/stepsDecimo"
import { StepsFgts } from "./steps/stepsFGTS"
import "./styles.css"
import { CalculoRescisao } from "./calculo"

export const Rescisao = () => {
    const [form] = Form.useForm();
    const [info, setInfo] = useState(null) //pega dados do formulário

    const dataFormat = "DD/MM/YYYY"; //formado dos inputs de data

    let diasAvisoPrevio = dayjs(form.getFieldValue("dataDemissao"), dataFormat).diff(form.getFieldValue("dataAdmissao"), "year") * 3 + 30;
    diasAvisoPrevio > 90 ? diasAvisoPrevio = 90 : diasAvisoPrevio;

    const onFinish = (values) => {
        setInfo(values);
    }

    const items = [
        {
            key: 1,
            label: "Informações gerais",
            children: <StepsInfo info={info} />
        },
        {
            key: 2,
            label: "Remuneração",
            children: <StepsRem info={info} />
        },
        {
            key: 3,
            label: "Férias",
            children: <StepsFerias />
        },
        {
            key: 4,
            label: "13° Salário",
            children: <StepsDecimo />
        },
        {
            key: 5,
            label: "FGTS",
            children: <StepsFgts />
        },
    ]

    return (
        <Card>
            <Form layout="vertical" form={form} onSubmit={onFinish} onFinish={onFinish} onChange={onFinish}>
                <Card title="Simulação de rescisão">
                    <Collapse items={items} size="large" style={{ width: "100%" }} accordion />
                    <Button htmlType="submit" type="primary" onClick={<CalculoRescisao info={info} />}>Calcular</Button>
                </Card>
            </Form>
        </Card>
    )
}