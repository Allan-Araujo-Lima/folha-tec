import { useState } from "react";
import { Form, message, Steps, Button, Checkbox, Collapse } from "antd";
import ".././styles.css";
import { MonetaryInput } from "../../../hooks/inputMask";

export const StepsDecimo = ({ info }) => {
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
                            <Form.Item name={"adiantamentoDecimo"} label="Valor adiantado ao empregado">
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
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
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
