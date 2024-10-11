import { useState } from "react";

import { MonetaryInput } from "../../../hooks/inputMask";
import { Form, message, Steps, Select, Button, InputNumber, Checkbox, Collapse } from "antd";

import ".././styles.css";

export const StepsRem = () => {
    const [amount, setAmount] = useState("");
    const [current, setCurrent] = useState(0);
    const [selectedOption, setSelectecOption] = useState("");
    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked(!checked);
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
        setChecked(false);
    };

    const stepsRemuneracao = [
        {
            title: "Salário-base",
            description:
                <Form.Item name="salarioBase">
                    <MonetaryInput
                        value={amount}
                        onChange={(value) => setAmount(value)}
                        placeholder="0,00"
                        addonBefore="R$"
                        disabled={current !== 0}
                    />
                </Form.Item>
        },
        {
            title: "Adicionais",
            description:
                <div>
                    <Form.Item name="adicionais" required initialValue={"Nenhum"}>
                        <Select
                            id="adicionais"
                            className="adicionais"
                            disabled={current !== 1}
                            onChange={(e) => setSelectecOption(e)}>
                            <Select.Option value="">Nenhum</Select.Option>
                            <Select.Option value="insalubridade">Insalubridade</Select.Option>
                            <Select.Option value="periculosidade">Periculosidade</Select.Option>
                        </Select>
                    </Form.Item>
                    <div>
                        {
                            selectedOption === "insalubridade" ?
                                <Form.Item
                                    label="Insalubridade"
                                    name="insalubridade"
                                    initialValue={20}
                                    style={{ marginLeft: '25px' }}
                                    rules={[
                                        { required: true, message: "Por favor, digite o adicional de insalubridade." },
                                        { type: "number", min: 10, max: 100, message: "O valor do adicional de insalubridade deve estar entre 10 e 100." }
                                    ]}
                                >
                                    <InputNumber
                                        type="number"
                                        addonBefore="I"
                                        addonAfter="%"
                                        disabled={current !== 1}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                                :
                                null
                        }
                        {
                            selectedOption === "periculosidade" ?
                                <Form.Item
                                    label="Periculosidade"
                                    name="periculosidade"
                                    initialValue={30}
                                    style={{ marginLeft: '25px' }}
                                    rules={[
                                        { required: true, message: "Por favor, digite o adicional de periculosidade." },
                                        { type: "number", min: 30, max: 100, message: "O valor do adicional de periculosidade deve estar entre 30 e 100." }
                                    ]}
                                >
                                    <InputNumber
                                        type="number"
                                        addonBefore="I"
                                        addonAfter="%"
                                        disabled={current !== 1}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                                :
                                null
                        }
                    </div>
                </div>
        },
        {
            title: "Remuneração Variável",
            description:
                <div>
                    <Form.Item name="remuneracaoVariavel">
                        <Checkbox
                            name="remuneracaoVariavel"
                            checked={checked}
                            onChange={toggleChecked}
                            disabled={current !== 2}
                        >
                            Empregado possui remuneração variável?
                        </Checkbox>
                    </Form.Item>
                    {
                        checked === true ?
                            <Form.Item
                                name="remuneracaoVariavelVal"
                                label="Remuneração variável (média)"
                                tooltip={"Colocar a soma total dos valores recebidos de forma variável no período de apuração das médias."}>
                                <div>
                                    <Form.Item
                                        name={"variavelFeriasVencidas"}
                                        label={"Férias Vencidas"}
                                        tooltip={"Salvo previsão diferente em convensão coletiva, considerar os últimos 12 meses trabalhados."}
                                    >
                                        <MonetaryInput
                                            value={amount}
                                            onChange={(value) => setAmount(value)}
                                            placeholder="0,00"
                                            addonBefore="R$"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={"variavelFeriasProporcionais"}
                                        label={"Férias Proporcionais"}
                                        tooltip={"Salvo previsão diferente em convensão coletiva, considerar os últimos 12 meses trabalhados."}
                                    >
                                        <MonetaryInput
                                            value={amount}
                                            onChange={(value) => setAmount(value)}
                                            placeholder="0,00"
                                            addonBefore="R$"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={"variavelDecimo"}
                                        label={"13° Salário"}
                                        tooltip={"Salvo previsão diferente em convensão coletiva, considerar os meses trabalhados durante o ano corrente."}
                                    >
                                        <MonetaryInput
                                            value={amount}
                                            onChange={(value) => setAmount(value)}
                                            placeholder="0,00"
                                            addonBefore="R$"
                                        />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            :
                            null
                    }
                </div>
        }
    ]
    const getUpdatedStepsRem = () => {
        return stepsRemuneracao.map((teste, index) => {
            if (index === current) {
                return { ...teste, disabled: false, status: "process" };
            } else {
                return { ...teste, disabled: true, status: "wait" };
            }
        });
    };

    const itemsPanel = [
        {
            key: '1',
            label: 'Remuneração',
            children:
                <div>
                    <Steps
                        className="steps"
                        direction="vertical"
                        current={stepsRemuneracao}
                        items={getUpdatedStepsRem()}>
                    </Steps>
                    <div style={{ marginTop: 24 }}>
                        {current < stepsRemuneracao.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Próximo
                            </Button>
                        )}
                        {current === stepsRemuneracao.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Férias
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Anterior
                            </Button>
                        )}
                    </div>
                </div>
        }
    ]

    return (
        <Collapse items={itemsPanel} size="large" style={{ width: "100%" }} />
    )
}
