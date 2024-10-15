import { useState } from "react";
import { Card, Form, Button, Collapse } from "antd";
import { StepsRem } from "./steps/stepsRem";
import { StepsFerias } from "./steps/stepsFerias";
import { StepsInfo } from "./steps/stepsInfo";
import { StepsDecimo } from "./steps/stepsDecimo";
import { StepsFgts } from "./steps/stepsFGTS";
import "./styles.css";
import { Calculo } from "./calculo";

export const Rescisao = () => {
    const [form] = Form.useForm();
    const [info, setInfo] = useState({}); // Pega dados do formulário
    const [activeKey, setActiveKey] = useState(['1']); // Painel ativo

    // Função para abrir um novo painel
    const openPanel = (currentKey) => {
        const nextKey = (parseInt(currentKey) + 1).toString(); // Próximo painel
        setActiveKey([nextKey]); // Abre apenas o próximo painel
    };

    // Função chamada ao submeter o formulário
    const onFinish = (values) => {
        setInfo(values); // Atualiza o estado com os valores do formulário
    };

    // Função para capturar as mudanças no formulário
    const onFormChange = (changedValues, allValues) => {
        setInfo(allValues); // Atualiza o estado com todos os valores do formulário
    };

    const items = [
        {
            key: "1",
            label: "Informações gerais",
            children: <StepsInfo info={info} changeStep={openPanel} />
        },
        {
            key: "2",
            label: "Remuneração",
            children: <StepsRem info={info} changeStep={openPanel} />
        },
        {
            key: "3",
            label: "Férias",
            children: <StepsFerias changeStep={openPanel} />
        },
        {
            key: "4",
            label: "13° Salário",
            children: <StepsDecimo changeStep={openPanel} />
        },
        {
            key: "5",
            label: "FGTS",
            children: <StepsFgts />
        },
    ];

    return (
        <Card>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onValuesChange={onFormChange}
            >
                <Card title="Simulação de rescisão">
                    <Collapse
                        defaultActiveKey='1' // Definindo o painel inicial aberto
                        activeKey={activeKey} // Painel ativo gerenciado pelo estado
                        onChange={(keys) => setActiveKey(keys)} // Atualiza os painéis abertos
                        items={items}
                        size="large"
                        style={{ width: "100%" }}
                        accordion
                    />
                    <Button htmlType="submit" type="primary" style={{ margin: "12px" }}>
                        Calcular
                    </Button>
                </Card>
            </Form>
            <Calculo info={info} />
        </Card>
    );
};
