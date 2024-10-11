import { Input, InputNumber } from "antd";
import { NumericFormat, removeNumericFormat, PatternFormat } from 'react-number-format';

//Mascara os inputs de horas para o formato correto
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

//Mascara o inputs dos valroes digitados pelo usuário
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

//Mascara os dias digitados pelo usuário
export const DaysInput = ({ value, onChange, ...props }) => {
    return (
        <InputNumber
            value={value}
            min={1}
            max={30}
            onChange={(val) => onChange(val)}
            {...props}
        />
    );
};

//Mascara os dados que são apresentados ao usuário, após serem tratados
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

//Remove os caracteres que não são números de um input mascarado
export const RemoneMonetaryValue = ({ value }) => {
    return (
        removeNumericFormat(value)
    )
}