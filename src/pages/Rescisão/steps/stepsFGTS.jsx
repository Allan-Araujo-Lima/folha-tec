import { useState } from "react";
import { Form, message, Steps, Button, Collapse, Tooltip } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import ".././styles.css";
import { MonetaryInput } from "../../../hooks/inputMask";

export const StepsFgts = ({ info }) => {
    const [current, setCurrent] = useState(0);
    const [amount, setAmount] = useState("")

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const stepsFgts = [
        {
            title:
                <div>
                    Saldo para fins rescisórios
                    <Tooltip title='O saldo do FGTS pode ser consultado
                    através do Conectividade Social ou através do aplicativo
                    "FGTS", disponível nas lojas de aplicativos.'>
                        <QuestionCircleOutlined style={{ marginLeft: "6px", color: "rgba(0, 0, 0, 0.45)" }} />
                    </Tooltip>
                </div>,
            description: (
                <Form.Item name="fgts">
                    <MonetaryInput
                        value={amount}
                        onChange={(value) => setAmount(value)}
                        style={{ width: "100%" }}
                        addonBefore={"R$"}
                    />
                </Form.Item>
            )
        }
    ];

    const getUpdatedStepsRem = () => {
        return stepsFgts.map((step, index) => ({
            ...step,
            disabled: index !== current,
            status: index === current ? "process" : "wait"
        }));
    };

    const itemsPanel = [
        {
            key: '1',
            label: 'FGTS',
            children: (
                <div>
                    <Steps
                        className="steps"
                        direction="vertical"
                        current={current}
                        items={getUpdatedStepsRem()}
                    />
                </div>
            )
        }
    ];

    return (
        <Collapse items={itemsPanel} size="large" style={{ width: "100%" }} />
    );
};
