import { useState } from "react"

import { Card, Form, Divider } from "antd"
import dayjs from "dayjs"

import { StepsRem } from "./steps/stepsRem"
import { StepsEnd } from "./steps/stepsEnd"
import { StepsInfo } from "./steps/stepsInfo"
import "./styles.css"

export const Rescisao = () => {
    const [form] = Form.useForm();
    const [info, setInfo] = useState(null)

    const dataFormat = "DD/MM/YYYY";

    let diasAvisoPrevio = dayjs(form.getFieldValue("dataDemissao"), dataFormat).diff(form.getFieldValue("dataAdmissao"), "year") * 3 + 30;
    diasAvisoPrevio > 90 ? diasAvisoPrevio = 90 : diasAvisoPrevio;


    const onFinish = (values) => {
        setInfo(values);
        console.log(info)
    }

    return (
        <Card>
            <Form layout="vertical" form={form} onFinish={onFinish} onChange={onFinish}>
                <Card title="Simulação de rescisão">
                    <StepsInfo info={info} />
                    <Divider />
                    <StepsRem info={info} />
                    <Divider />
                    <StepsEnd info={info} />
                </Card>
            </Form>
        </Card>
    )
}