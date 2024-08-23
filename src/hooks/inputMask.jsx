import InputMask from "react-input-mask";
import { Input } from "antd";
import { NumericFormat, removeNumericFormat } from 'react-number-format'; // Certifique-se de usar a importação correta

export const MaskedInput = ({ mask, ...props }) => {
    return (
        <InputMask mask={mask} {...props}>
            {(inputProps) => <Input {...inputProps} />}
        </InputMask>
    );
};

export const MonetaryInput = ({ value, onChange, ...props }) => {
    return (
        <NumericFormat
            value={value}
            displayType="input"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
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
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={0}
            customInput={Input}
            allowNegative={false}
            onValueChange={(values) => {
                onChange(values.floatValue);
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
            {...props}
        />
    );
};

export const RemoneMonetaryValue = ({ value }) => {
    return (
        removeNumericFormat(value)
    )
}