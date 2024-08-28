import { Input, InputNumber } from "antd";
import { NumericFormat, removeNumericFormat, PatternFormat } from 'react-number-format';

export const MaskedInput = ({ value, ...props }) => {
    return (
        <PatternFormat
            value={value}
            displayType="input"
            format="###:##"
            customInput={Input}
            {...props}
        />
    )
};

export const MonetaryInput = ({ value, onChange, ...props }) => {
    return (
        <NumericFormat
            value={value}
            displayType="input"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={2}
            customInput={Input}
            allowNegative={false}
            onValueChange={(values) => {
                onChange(values.floatValue);
            }}
            {...props}
        />
    );
};

export const DaysInput = ({ value, onChange, ...props }) => {
    return (
        <NumericFormat
            value={value}
            displayType="input"
            decimalScale={0}
            customInput={Input}
            allowNegative={false}
            onValueChange={(values) => {
                onChange(values.value);
            }}
            {...props}
        />
    );
};

export const MonetaryOutput = ({ value, ...props }) => {
    return (
        <NumericFormat
            value={value}
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={2}
            {...props}
        />
    );
};

export const RemoneMonetaryValue = ({ value }) => {
    return (
        removeNumericFormat(value)
    )
}