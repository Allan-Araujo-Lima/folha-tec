import dayjs from "dayjs"

import { Button } from "antd"
import { SalarioMinimo } from "../../hooks"

const rescisoesAviso = ["semJustaCausa", "pedidoDemissao", "rescisaoCulpaReciproca", "rescisaoCulpaEmpregador", "rescisaoAcordoPartes"]
const indExperiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"]

export const Calculo = ({ info }) => {

    const dataFormat = "DD/MM/YYYY";

    let diasAvisoPrevio = info?.dataDemissao && info?.dataAdmissao ? dayjs(info.dataDemissao, dataFormat).diff(info.dataAdmissao, "year") * 3 + 30 : 30;
    if (diasAvisoPrevio > 90) diasAvisoPrevio = 90;

    const progecaoAviso = dayjs(info.dataDemissao).add(diasAvisoPrevio, "day").format(dataFormat)

    const submit = () => {
        //informações base
        const salarioBase = info.salarioBase;
        const insalubridade = info.adicionais == "insalubridade" ? SalarioMinimo * info.insalubridade / 100 : 0;
        const periculosidade = info.adicionais == "insalubridade" ? salarioBase * info.insalubridade / 100 : 0;
        const salarioBaseAdicionais = salarioBase + insalubridade + periculosidade

        //definição da base de cálculo de cada rúbrica específica
        const baseAviso = salarioBaseAdicionais + info?.variavelRescisao;
        const baseFeriasVencidas = info.variavelFeriasVencidas > 0 ? salarioBaseAdicionais + info?.variavelFeriasVencidas : salarioBaseAdicionais;
        const baseFeriasProporcionais = salarioBaseAdicionais + info?.variavelFeriasProporcionais;
        const baseDecimo = salarioBaseAdicionais + info?.variavelDecimo;

        //verifica o tipo de rescisão
        if (rescisoesAviso.includes(info.tipoDeRescisao)) {
            //falta lógica
        } else if (indExperiencia.includes(info.tipoDeRescisao)) {
            const diasIndenizacaoExperiencia = dayjs(info.fimPrazoDeterminado).diff(info.dataDemissao)
            const indenizacaoExperiencia = baseAviso / 30 * diasIndenizacaoExperiencia / 2
            if (info.tipoDeRescisao == "rescisaoAntecipaContratoExperienciaEmpregador") {
                //falta lógica
            } else {
                //falta lógica
            }
        } else {
            //falta lógica
        }

        //férias vencidas
        const diferencaAnoAdmissaoDemissao = dayjs(info.dataDemissao).year() - dayjs(info.dataAdmissao).year() - 1;
        const inicioPeriodoAquisitivoFeriasVencidas = dayjs(info.dataAdmissao).add(diferencaAnoAdmissaoDemissao, "year").format(dataFormat);
        if (dayjs(inicioPeriodoAquisitivoFeriasVencidas).isBefore(info.dataDemissao, "day") === true) {
            const feriasVencidas = baseFeriasVencidas / 30 * (30 - info?.feriasVencidas);
            const tercoFeriasVencidas = feriasVencidas / 3;
        }
        //férias proporcionais
        const inicioPeriodoAquisitivoFeriasProporcionais = dayjs(inicioPeriodoAquisitivoFeriasVencidas, dataFormat).add(1, "year");
        console.log(dayjs(inicioPeriodoAquisitivoFeriasProporcionais).format(dataFormat))
        let periodoAquisitivoFeriasProporcionaisMes = dayjs(info.dataDemissao).diff(inicioPeriodoAquisitivoFeriasProporcionais, "months");
        console.log(periodoAquisitivoFeriasProporcionaisMes)
        if (dayjs(inicioPeriodoAquisitivoFeriasProporcionais).add(periodoAquisitivoFeriasProporcionaisMes, "month").diff(info.dataDemissao, "day") * -1 + 1 >= 15) {
            periodoAquisitivoFeriasProporcionaisMes++
        }

        //13° salário
    }

    return (
        <div>
            <Button onClick={console.log(submit())}></Button>
        </div>
    )
}