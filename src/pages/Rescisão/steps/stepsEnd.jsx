import { useState } from "react";
import { Form, message, Steps, Button, Checkbox, Collapse, DatePicker } from "antd";
import ".././styles.css";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const StepsEnd = ({ info }) => {
    const [current, setCurrent] = useState(0);
    const [checked, setChecked] = useState(false);
    const [checkedFerias, setCheckedFerias] = useState(false);

    const dataFormat = "DD/MM/YYYY";

    const disabled30DaysDate = (currentDate, { from }) => {
        if (from) {
            console.log(info.dataAdmissao)
            const minDate = dayjs(info?.dataAdmissao, dataFormat);
            const maxDate = from.add(29, 'days');
            return currentDate.isBefore(minDate) || currentDate.isAfter(maxDate);
        }
        return false;
    };

    const toggleChecked = () => {
        setChecked(!checked);
    };

    const toggleCheckedFerias = () => {
        setCheckedFerias(!checkedFerias);
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
        setChecked(false);
    };

    const stepsFinal = [
        {
            title: "Férias vencidas",
            description: (
                <div>
                    <Checkbox checked={checkedFerias} onChange={toggleCheckedFerias}>
                        Funcionário gozou seu último período de férias vencidas?
                    </Checkbox>
                    {
                        checkedFerias === true ?
                            <Form.Item name={"feriasVencidas"} label="Período de gozo">
                                <RangePicker minDate={info.dataAdmissao} disabledDate={disabled30DaysDate} format={dataFormat} />
                            </Form.Item>
                            :
                            null
                    }
                </div>
            )
        },
    ];

    const getUpdatedStepsRem = () => {
        return stepsFinal.map((step, index) => ({
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
                        {current < stepsFinal.length - 1 && (
                            <Button type="primary" onClick={next}>
                                Próximo
                            </Button>
                        )}
                        {current === stepsFinal.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Remuneração
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
