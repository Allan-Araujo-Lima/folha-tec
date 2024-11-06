export function CalcularHoraExtra(values) {
    let salarioTotal = values.salario;
    if (values.insalubridade) {
        salarioTotal += 1412 * (values.insalubridade / 100);
    } else if (values.periculosidade) {
        salarioTotal += values.salario * (values.periculosidade / 100);
    }
    const result = (salarioTotal / values.horasmes) * ((values.percentualhorasextras / 100) + 1) * values.horasextras;
    const dsr = (result / values.uteis) * values.naouteis;

    return {
        result: result,
        dsr: dsr,
        horas: values.horasextras
    }
}