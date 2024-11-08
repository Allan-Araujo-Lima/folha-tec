import { useState } from "react";
import { Form, message, Steps, Button, Checkbox, Collapse } from "antd";

import { MonetaryInput } from "../../../hooks/inputMask";
import "../../styles.css";

export const StepsDecimo = ({ info, changeStep }) => {
    const [current, setCurrent] = useState(0);
    const [checkerDecimo, setCheckedDecimo] = useState(false);
    const [amount, setAmount] = useState("")

    const toggleCheckedDecimo = () => {
        setCheckedDecimo(!checkerDecimo);
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const stepsDecimo = [
        {
            title: "Antecipação do 13° salário",
            description: (
                <div>
                    <Checkbox checked={checkerDecimo} onChange={toggleCheckedDecimo}>
                        Houve antecipação do 13° salário para o colaborador?
                    </Checkbox>
                    {
                        checkerDecimo === true ?
                            <Form.Item name={"adiantamentoDecimo"} label="Valor adiantado ao empregado"
                                rules={[({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        let maxDecimo = info.salarioBase;
                                        maxDecimo += info.insalubridade ? info.insalubridade : 0;
                                        maxDecimo += info.periculosidade ? info.periculosidade : 0;
                                        maxDecimo += info.variavelDecimo ? info.variavelDecimo : 0
                                        console.log(maxDecimo)
                                        if (getFieldValue("adiantamentoDecimo") > maxDecimo * 0.80) {
                                            return Promise.reject(new Error('O valor do adiantamento de 13° são pode ser maior do que 80% da sua base de cálculo.'))
                                        }
                                        return Promise.resolve();
                                    }
                                })]}>
                                <MonetaryInput
                                    value={amount}
                                    onChange={(value) => setAmount(value)}
                                    style={{ width: "100%" }}
                                    addonBefore={"R$"}
                                />
                            </Form.Item>
                            :
                            null
                    }
                </div>
            )
        }
    ];

    const getUpdatedStepsRem = () => {
        return stepsDecimo.map((step, index) => ({
            ...step,
            disabled: index !== current,
            status: index === current ? "process" : "wait"
        }));
    };

    return (
        <div>
            <Steps
                className="steps"
                direction="vertical"
                current={current}
                items={getUpdatedStepsRem()}
            />
            <div style={{ marginTop: 24 }}>
                {current < stepsDecimo.length - 1 && (
                    <Button type="primary" onClick={next}>
                        Próximo
                    </Button>
                )}
                {current === stepsDecimo.length - 1 && (
                    <Button type="primary" onClick={() => changeStep("4")}>
                        FGTS
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={prev}>
                        Anterior
                    </Button>
                )}
            </div>
        </div>
    );
};
