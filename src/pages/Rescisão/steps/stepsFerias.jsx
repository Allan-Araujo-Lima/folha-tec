import { useState } from "react";
import { Form, message, Steps, Button, Checkbox, Collapse } from "antd";
import ".././styles.css";
import { DaysInput } from "../../../hooks/inputMask";

export const StepsFerias = ({ info }) => {
    const [current, setCurrent] = useState(0);
    const [checkedFerias, setCheckedFerias] = useState(false);
    const [checkedColetivas, setCheckedColetivas] = useState(false);
    const [amount, setAmount] = useState("")

    const toggleCheckedFerias = () => {
        setCheckedFerias(!checkedFerias);
    };

    const toggleCheckedColetivas = () => {
        setCheckedColetivas(!checkedColetivas);
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const itemsFerias = [
        {
            title: "Férias vencidas",
            description: (
                <div>
                    <Checkbox checked={checkedFerias} onChange={toggleCheckedFerias}>
                        Funcionário gozou seu último período de férias vencidas?
                    </Checkbox>
                    {
                        checkedFerias === true ?
                            <Form.Item name={"feriasVencidas"} label="Quantidade de dias gozados">
                                <DaysInput
                                    value={amount}
                                    style={{ width: "100%" }}
                                    addonAfter="Dia(s)"
                                    maxLength={2}
                                />
                            </Form.Item>
                            :
                            null
                    }
                </div>
            )
        },
        {
            title: "Férias coletivas",
            description:
                <div>
                    <Checkbox checked={checkedColetivas} onChange={toggleCheckedColetivas}>
                        Houve férias coletivas ou antecipação das férias proporcionais?
                    </Checkbox>
                    {
                        checkedColetivas === true ?
                            <Form.Item name={"feriasColetivas"} label="Quantidade de dias gozados">
                                <DaysInput
                                    value={amount}
                                    style={{ width: "100%" }}
                                    addonAfter="Dia(s)"
                                    maxLength={2}
                                />
                            </Form.Item>
                            :
                            null
                    }
                </div>
        }
    ];

    const getUpdatedStepsRem = () => {
        return itemsFerias.map((step, index) => ({
            ...step,
            disabled: index !== current,
            status: index === current ? "process" : "wait"
        }));
    };

    const itemsPanel = [
        {
            key: '1',
            label: 'Férias',
            children: (
                <div>
                    <Steps
                        className="steps"
                        direction="vertical"
                        current={current}
                        items={getUpdatedStepsRem()}
                    />
                    <div style={{ marginTop: 24 }}>
                        {current < itemsFerias.length - 1 && (
                            <Button type="primary" onClick={next}>
                                Próximo
                            </Button>
                        )}
                        {current === itemsFerias.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                13° Salário
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={prev}>
                                Anterior
                            </Button>
                        )}
                    </div>
                </div>
            )
        }
    ];

    return (
        <Collapse items={itemsPanel} size="large" style={{ width: "100%" }} />
    );
};
