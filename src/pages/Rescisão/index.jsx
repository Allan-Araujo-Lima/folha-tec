import { useState } from "react";
import { Card, Form, Button, Collapse, Space, Divider } from "antd";
import { StepsRem } from "./steps/stepsRem";
import { StepsFerias } from "./steps/stepsFerias";
import { StepsInfo } from "./steps/stepsInfo";
import { StepsDecimo } from "./steps/stepsDecimo";
import { StepsFgts } from "./steps/stepsFGTS";
import { Calculo } from "./calculo";
import { AvisoCalculo } from "../../components/Avisos";

import "../styles.css";

export const Rescisao = () => {
    const [form] = Form.useForm();
    const [info, setInfo] = useState({}); // Pega dados do formulário
    const [activeKey, setActiveKey] = useState(['1']); // Painel ativo
    const [result, setResult] = useState(false)

    // Função para abrir um novo painel
    const openPanel = (currentKey) => {
        const nextKey = (parseInt(currentKey) + 1).toString(); // Próximo painel
        setActiveKey([nextKey]); // Abre apenas o próximo painel
    };

    // Função chamada ao submeter o formulário
    const onFinish = (values) => {
        setInfo(values); // Atualiza o estado com os valores do formulário
        setResult(true)
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

    const clear = () => {
        form.resetFields();
        setResult(false)
    }

    const error = () => {
        if (form.getFieldValue("salarioBase") === undefined) {
            setActiveKey([2])
        } else {
            setActiveKey([1])
        }
    }

    return (
        <div className="container">
            <nav className="nav-container">
                <p>
                    Na calculadora de rescisão é possível verificar o valor da cada verba devida separadamente, além da possibilidade
                    de seleção do tipo de rescisão e a forma com que o aviso prévio foi realizado.<br />
                    Além disso, também é possivel verificar o valor de FGTS devido sobre a rescisão contratual, calculando também a
                    multa do FGTS para os tipos de rescisões em que ela é devida.
                </p>
            </nav>
            <Card title="Simulação de Rescisão">
                <Form
                    className="rescisaoForm"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onValuesChange={onFormChange}
                    scrollToFirstError={true}
                    onFinishFailed={error}
                >
                    <Collapse
                        defaultActiveKey='1' // Definindo o painel inicial aberto
                        activeKey={activeKey} // Painel ativo gerenciado pelo estado
                        onChange={(keys) => setActiveKey(keys)} // Atualiza os painéis abertos
                        items={items}
                        size="large"
                        accordion
                    />
                    <div className="calcularBotao">
                        <Button htmlType="submit" type="primary" style={{ margin: "12px" }}>
                            Calcular
                        </Button>
                        <Button htmlType='button' onClick={clear}>
                            Limpar
                        </Button>
                    </div>
                </Form>
            </Card>
            {result === true ?
                <>
                    <Divider />
                    <Calculo info={info} />
                </>
                : null
            }
            <AvisoCalculo />
        </div>
    );
};
