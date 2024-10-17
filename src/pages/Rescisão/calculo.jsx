import dayjs from "dayjs"

import { Button } from "antd"
import { SalarioMinimo } from "../../hooks"

const rescisoesAviso = ["semJustaCausa", "pedidoDemissao", "rescisaoCulpaReciproca", "rescisaoCulpaEmpregador", "rescisaoAcordoPartes"]
const indExperiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"]

export const Calculo = ({ info }) => {

    const dataFormat = "DD/MM/YYYY";

    const submit = () => {
        //informações base
        const salarioBase = info.salarioBase;
        const insalubridade = info.adicionais == "insalubridade" ? SalarioMinimo * info.insalubridade / 100 : 0;
        const periculosidade = info.adicionais == "insalubridade" ? salarioBase * info.insalubridade / 100 : 0;
        const salarioBaseAdicionais = salarioBase + insalubridade + periculosidade;

        //datas e quantidade de dias
        let diasAvisoPrevio = info?.dataDemissao && info?.dataAdmissao ? dayjs(info.dataDemissao, dataFormat).diff(info.dataAdmissao, "year") * 3 + 30 : 30;
        if (diasAvisoPrevio > 90) diasAvisoPrevio = 90;
        const dataDemissao = info.tipoDeAviso === "avisoTrabalhado" ? dayjs(info.dataDemissao).add(diasAvisoPrevio, "day") : info.dataDemissao;

        //definição da base de cálculo de cada rúbrica específica
        const baseAviso = salarioBaseAdicionais + info?.variavelRescisao;
        const baseFeriasVencidas = info.variavelFeriasVencidas > 0 ? salarioBaseAdicionais + info.variavelFeriasVencidas : salarioBaseAdicionais;
        const baseFeriasProporcionais = info.variavelFeriasProporcionais > 0 ? salarioBaseAdicionais + info.variavelFeriasProporcionais : salarioBaseAdicionais;
        const baseDecimo = info.variavelDecimo > 0 ? salarioBaseAdicionais + info.variavelDecimo : salarioBaseAdicionais;

        //verifica o tipo de rescisão
        let valorAviso = 0;

        if (rescisoesAviso.includes(info.tipoDeRescisao)) {
            //falta lógica
        } else if (indExperiencia.includes(info.tipoDeRescisao)) {
            const diasIndenizacaoExperiencia = dayjs(info.fimPrazoDeterminado).diff(dataDemissao)
            const indenizacaoExperiencia = baseAviso / 30 * diasIndenizacaoExperiencia / 2
            if (info.tipoDeRescisao == "rescisaoAntecipaContratoExperienciaEmpregador") {
                //falta lógica
            } else {
                //falta lógica
            }
        }

        //férias vencidas
        const diferencaAnoAdmissaoDemissao = dayjs(dataDemissao).year() - dayjs(info.dataAdmissao).year() - 1;
        const inicioPeriodoAquisitivoFeriasVencidas = dayjs(info.dataAdmissao).add(diferencaAnoAdmissaoDemissao, "year").format(dataFormat);
        if (dayjs(inicioPeriodoAquisitivoFeriasVencidas).isBefore(dataDemissao, "day") === true) {
            const feriasVencidas = baseFeriasVencidas / 30 * (30 - info?.feriasVencidas);
            const tercoFeriasVencidas = feriasVencidas / 3;
        }

        //férias proporcionais
        const inicioPeriodoAquisitivoFeriasProporcionais = dayjs(inicioPeriodoAquisitivoFeriasVencidas, dataFormat).add(1, "year");
        let periodoAquisitivoFeriasProporcionaisMes = dayjs(dataDemissao).diff(inicioPeriodoAquisitivoFeriasProporcionais, "months");
        if (dayjs(inicioPeriodoAquisitivoFeriasProporcionais).add(periodoAquisitivoFeriasProporcionaisMes, "month").diff(dataDemissao, "day") * -1 + 1 >= 15) {
            periodoAquisitivoFeriasProporcionaisMes++
        };

        const feriasProporcionais = info.feriasColetivas ? baseFeriasProporcionais / 30 * periodoAquisitivoFeriasProporcionaisMes * 2.5 - info.feriasColetivas : baseFeriasProporcionais / 30 * periodoAquisitivoFeriasProporcionaisMes * 2.5;
        const tercoFeriasProporcionais = feriasProporcionais / 3

        //13° salário
        let avosDecimo = -1;

        let inicioDecimo = dayjs(dataDemissao).startOf("year");
        if (dayjs(info.dataAdmissao).isAfter(dayjs(inicioDecimo))) {
            inicioDecimo = dayjs(info.dataAdmissao);
            // Verifica se trabalhou mais de 15 dias no mês da admissão
            if (dayjs(dayjs(inicioDecimo).endOf("month")).diff(inicioDecimo, "day") + 1 >= 15) {
                avosDecimo++;
            };
        };

        // Calcula os avos de décimo terceiro
        avosDecimo += dayjs(dataDemissao).month() - dayjs(inicioDecimo).month();

        // Identifica o começo do mês de rescisão
        const comecoMesRescisao = dayjs(dataDemissao).startOf("month");

        // Verifica se há mais de 15 dias no último mês de trabalho
        if (dayjs(dataDemissao).diff(comecoMesRescisao, "day") + 1 >= 15) {
            avosDecimo++;
        };

        const valorDecimo = baseDecimo / 12 * avosDecimo;
    }

    return (
        <div>
            <Button onClick={submit()}></Button>
        </div>
    )
}