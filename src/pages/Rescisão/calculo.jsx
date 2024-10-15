import dayjs from "dayjs"

import { Button } from "antd"

const rescisoesAviso = ["semJustaCausa", "pedidoDemissao", "rescisaoCulpaReciproca", "rescisaoCulpaEmpregador", "rescisaoAcordoPartes"]
const indExperiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"]

export const Calculo = ({ info }) => {

    const submit = () => {
        //verifica o tipo de rescisão
        console.log(info.dataAdmissao)
        if (rescisoesAviso.includes(info.tipoDeRescisao)) {
            console.log("1")
        } else if (indExperiencia.includes(info.tipoDeRescisao)) {
            const indenizacaoExperiencia = dayjs(info.fimPrazoDeterminado).diff(info.dataDemissao)
            if (info.tipoDeRescisao == "rescisaoAntecipaContratoExperienciaEmpregador") {
                indenizacaoExperiencia //provento
            } else {
                indenizacaoExperiencia //desconto
            }
        } else {
            console.log("2")
        }
    }

    return (
        <div>
            <Button onClick={submit}></Button>
        </div>
    )
}