import { useState, useEffect } from "react"

import dayjs from "dayjs"

import { Button, Card, Table, Typography } from "antd"
const { Text } = Typography

import { inss, irrf, SalarioMinimo } from "../../hooks"
import { MonetaryOutput } from "../../hooks/inputMask"

const rescisoesAviso = ["semJustaCausa", "pedidoDemissao", "rescisaoCulpaReciproca", "rescisaoCulpaEmpregador", "rescisaoAcordoPartes"]
const indExperiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"]

export const Calculo = ({ info }) => {

    const dataFormat = "DD/MM/YYYY";
    const [tableData, setTableData] = useState([]);

    const submit = () => {

        let data = [];

        // Informações base
        const salarioBase = info.salarioBase;
        const insalubridade = info.adicionais == "insalubridade" ? SalarioMinimo * info.insalubridade / 100 : 0;
        const periculosidade = info.adicionais == "periculosidade" ? salarioBase * info.periculosidade / 100 : 0;
        const salarioBaseAdicionais = salarioBase + insalubridade + periculosidade;

        // Datas e quantidade de dias
        let diasAvisoPrevio = info?.dataDemissao && info?.dataAdmissao ? dayjs(info.dataDemissao, dataFormat).diff(info.dataAdmissao, "year") * 3 + 30 : 30;
        if (diasAvisoPrevio !== 30 && dayjs(info?.dataAdmissao).add(dayjs(info?.dataDemissao).year() - dayjs(info?.dataAdmissao).year(), "year").isBefore(dayjs(info?.dataDemissao).add(diasAvisoPrevio + 1, "day"))) {
            diasAvisoPrevio += 3;
        };

        if (diasAvisoPrevio > 90) {
            diasAvisoPrevio = 90
        };


        info.abled === true ? diasAvisoPrevio -= 30 : null;
        const dataDemissao = info.tipoDeAviso === "avisoTrabalhado"
            ? info.abled === false
                ? dayjs(info.dataDemissao).add(diasAvisoPrevio, "day")
                : dayjs(info.dataDemissao).add(30, "day")
            : info.dataDemissao;

        const projecaoAviso = info.tipoDeAviso === "avisoIndenizado" ? dayjs(dataDemissao).add(diasAvisoPrevio, "day") : undefined;

        // Definição da base de cálculo de cada rúbrica específica
        const baseAviso = info?.variavelRescisao > 0 ? salarioBaseAdicionais + info.variavelRescisao : salarioBaseAdicionais;
        const baseFeriasVencidas = info.variavelFeriasVencidas > 0 ? salarioBaseAdicionais + info.variavelFeriasVencidas : salarioBaseAdicionais;
        const baseFeriasProporcionais = info.variavelFeriasProporcionais > 0 ? salarioBaseAdicionais + info.variavelFeriasProporcionais : salarioBaseAdicionais;
        const baseDecimo = info.variavelDecimo > 0 ? salarioBaseAdicionais + info.variavelDecimo : salarioBaseAdicionais;

        // Saldo de Salário e Adicionais
        const dataSaldoSalario = dayjs(info.dataAdmissao).isAfter(dataDemissao) ? info.dataAdmissao : dayjs(dataDemissao).startOf("month");
        const quantidadeDias = dayjs(dataDemissao).diff(dataSaldoSalario, "day") + 1
        const saldoSalario = info.salarioBase / 30 * quantidadeDias;
        const saldoInsalubridade = insalubridade / 30 * quantidadeDias;
        const saldoPericulosidade = periculosidade / 30 * quantidadeDias;
        const inssSaldoSalario = inss(saldoSalario + saldoInsalubridade + saldoPericulosidade);
        const irrfSaldoSalario = irrf(saldoSalario, 0, 0, inssSaldoSalario);

        // Férias vencidas
        const diferencaAnoAdmissaoDemissao = dayjs(dataDemissao).year() - dayjs(info.dataAdmissao).year() - 1;
        const inicioPeriodoAquisitivoFeriasVencidas = dayjs(info.dataAdmissao).add(diferencaAnoAdmissaoDemissao, "year").format(dataFormat);
        let feriasVencidas = 0
        let tercoFeriasVencidas
        const quantidadeAvosFeriasVencidas = 30 * (30 - info?.feriasVencidas)
        if (dayjs(inicioPeriodoAquisitivoFeriasVencidas).isBefore(dataDemissao, "day") === true) {
            feriasVencidas = baseFeriasVencidas / quantidadeAvosFeriasVencidas;
            tercoFeriasVencidas = feriasVencidas / 3;
        }

        // Férias proporcionais
        const inicioPeriodoAquisitivoFeriasProporcionais = dayjs(inicioPeriodoAquisitivoFeriasVencidas, dataFormat).add(1, "year");
        let periodoAquisitivoFeriasProporcionaisMes = dayjs(dataDemissao).diff(inicioPeriodoAquisitivoFeriasProporcionais, "months");
        if (dayjs(inicioPeriodoAquisitivoFeriasProporcionais).add(periodoAquisitivoFeriasProporcionaisMes, "month").diff(dataDemissao, "day") * -1 + 1 >= 15) {
            periodoAquisitivoFeriasProporcionaisMes++
        };
        const quantidadeAvosFeriasProporcionais = info.feriasColetivas ? periodoAquisitivoFeriasProporcionaisMes * 2.5 - info.feriasColetivas : periodoAquisitivoFeriasProporcionaisMes * 2.5;
        const feriasProporcionais = info?.tipoDeRescisao !== "porJustaCausa" ? baseFeriasProporcionais / 30 * quantidadeAvosFeriasProporcionais : 0;
        const tercoFeriasProporcionais = info?.tipoDeRescisao !== "porJustaCausa" ? feriasProporcionais / 3 : 0;

        // 13° salário
        let avosDecimo = 0;

        let inicioDecimo = dayjs(dataDemissao).startOf("year");
        if (dayjs(info.dataAdmissao).isAfter(dayjs(inicioDecimo))) {
            inicioDecimo = dayjs(info.dataAdmissao);
            // Verifica se trabalhou mais de 15 dias no mês da admissão
            if (dayjs(dayjs(inicioDecimo).endOf("month")).diff(inicioDecimo, "day") + 1 >= 15 && dayjs(dataDemissao).isAfter(inicioDecimo)) {
                avosDecimo++;
            } else {
                avosDecimo--;
            }
            ;
        };

        // Calcula os avos de décimo terceiro
        avosDecimo += dayjs(dataDemissao).month() - dayjs(inicioDecimo).month();

        // Identifica o começo do mês de rescisão
        const comecoMesRescisao = dayjs(dataDemissao).startOf("month").isBefore(inicioDecimo) ? inicioDecimo : dayjs(dataDemissao).startOf("month");

        // Verifica se há mais de 15 dias no último mês de trabalho
        if (dayjs(dataDemissao).diff(comecoMesRescisao, "day") + 1 >= 15 && dayjs(dataDemissao).month() !== dayjs(inicioDecimo).month()) {
            avosDecimo++;
        };

        const valorDecimo = info?.tipoDeRescisao !== "porJustaCausa" ? baseDecimo / 12 * avosDecimo : 0;

        let avosDecimoIndenizado = 0;

        if (projecaoAviso) {
            let inicioDecimoIndenizado = dayjs(dataDemissao);
            avosDecimoIndenizado += dayjs(projecaoAviso).diff(inicioDecimoIndenizado, "month")

            if (dayjs(projecaoAviso).diff(dayjs(projecaoAviso).startOf("month"), "day") + 1 < 15) {
                console.log("aqui")
                avosDecimoIndenizado--;
            }

            if (dayjs(dataDemissao).diff(comecoMesRescisao, "day") + 1 < 15) {
                console.log("aquiiiii")
                avosDecimoIndenizado++;
            };
        }
        const valorDecimoIndenizado = baseDecimo / 12 * avosDecimoIndenizado
        console.log(valorDecimoIndenizado)

        // Impostos 13° Salário
        const inssDecimo = inss(valorDecimo + valorDecimoIndenizado);
        const irrfDecimo = irrf(valorDecimo + valorDecimoIndenizado, 0, 0, inssDecimo);

        // Aviso prévio
        let valorAviso = 0;
        let pagarIndenizacao = true;
        let diasIndenizacaoExperiencia = null;
        let indenizacaoExperiencia = null

        if (rescisoesAviso.includes(info.tipoDeRescisao)) {
            if (info.tipoDeAviso === "avisoIndenizado" || info.abled === true) {
                valorAviso += baseAviso / 30 * diasAvisoPrevio;
                if (tipoDeRescisao === "rescisaoAcordoPartes") {
                    diasAvisoPrevio / 2;
                    valorAviso /= 2;
                }
                if (info.tipoDeAviso === "pedidoDemissao") {
                    pagarIndenizacao = false;
                }
            }
        } else if (indExperiencia.includes(info.tipoDeRescisao)) {
            diasIndenizacaoExperiencia = dayjs(info.fimPrazoDeterminado).diff(dataDemissao);
            indenizacaoExperiencia = baseAviso / 30 * diasIndenizacaoExperiencia / 2;
            if (info.tipoDeRescisao == "rescisaoAntecipaContratoExperienciaEmpregador") {
                pagarIndenizacao = true;
            } else {
                pagarIndenizacao = false
            }
        }


        const resultList = [
            {
                evento: "Saldo de Salário",
                referencia: `${quantidadeDias} dia(s)`,
                valor: saldoSalario,
                provento: true,
            },
            {
                evento: "Insalubridade",
                referencia: `${info.insalubridade}%`,
                valor: saldoInsalubridade,
                provento: true,
            },
            {
                evento: "Periculosidade",
                referencia: `${info.periculosidade}%`,
                valor: saldoPericulosidade,
                provento: true,
            },
            {
                evento: "Aviso Prévio Indenizado",
                referencia: `${diasAvisoPrevio} dias(s)`,
                valor: valorAviso,
                provento: pagarIndenizacao,
            },
            {
                evento: "Ind. Término Antecipado do Contrato de Exp.",
                referencia: `${diasIndenizacaoExperiencia} dia(s)`,
                valor: indenizacaoExperiencia,
                provento: pagarIndenizacao,
            },
            {
                evento: "Férias Vencidas",
                referencia: `${quantidadeAvosFeriasVencidas}/12`,
                valor: feriasVencidas,
                provento: true,
            },
            {
                evento: "Terço Férias Vencidas",
                referencia: null,
                valor: tercoFeriasVencidas,
                provento: true,
            },
            {
                evento: "Férias Proporcionais",
                referencia: `${quantidadeAvosFeriasProporcionais / 2.5}/12`,
                valor: feriasProporcionais,
                provento: true,
            },
            {
                evento: "Terço Férias Proporcionais",
                referencia: null,
                valor: tercoFeriasProporcionais,
                provento: true,
            },
            {
                evento: "13° Salário",
                referencia: `${avosDecimo}/12`,
                valor: valorDecimo,
                provento: true,
            },
            {
                evento: "13° Salário Indenizado",
                referencia: `${avosDecimoIndenizado}/12`,
                valor: valorDecimoIndenizado,
                provento: true,
            },
            {
                evento: "INSS Rescisão",
                referencia: null,
                valor: inssSaldoSalario,
                provento: false,
            },
            {
                evento: "IRRF Rescisão",
                referencia: null,
                valor: irrfSaldoSalario,
                provento: false,
            },
            {
                evento: "INSS 13° Salário",
                referencia: null,
                valor: inssDecimo,
                provento: false,
            },
            {
                evento: "IRRF 13° Salário",
                referencia: null,
                valor: irrfDecimo,
                provento: false,
            },
        ];

        let keyNumber = 0;
        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i].valor > 0) {
                keyNumber += 1;
                if (resultList[i].provento === false) {
                    data.push({
                        key: keyNumber,
                        evento: resultList[i].evento,
                        referencia: resultList[i].referencia,
                        provento: null,
                        desconto: <MonetaryOutput value={resultList[i].valor} />,
                        valorDesconto: resultList[i].valor
                    });
                } else {
                    data.push({
                        key: keyNumber,
                        evento: resultList[i].evento,
                        referencia: resultList[i].referencia,
                        provento: <MonetaryOutput value={resultList[i].valor} />,
                        desconto: null,
                        valorProvento: resultList[i].valor
                    });
                }
            }
        }
        setTableData(data);
    };

    useEffect(() => {
        submit();
    }, []);

    const columns = [
        {
            title: "Evento",
            dataIndex: "evento",
            key: "evento",
        },
        {
            title: "Referência",
            dataIndex: "referencia",
            key: "referencia",
            align: "center"
        },
        {
            title: "Provento (R$)",
            dataIndex: "provento",
            key: "provento",
            align: "center"
        },
        {
            title: "Desconto (R$)",
            dataIndex: "desconto",
            key: "desconto",
            align: "center"
        },
    ];

    return (
        <div>
            <Card title="Resultado">
                <Table columns={columns} dataSource={tableData} pagination={false}
                    summary={(pageData) => {
                        let totalProventos = 0;
                        let totalDescontos = 0;

                        pageData.forEach(({ valorProvento, valorDesconto }) => {
                            totalProventos += valorProvento ? valorProvento : 0;
                            totalDescontos += valorDesconto ? valorDesconto : 0;
                        }
                        );
                        return (
                            <>
                                <Table.Summary.Row style={{ textAlign: "center", fontSize: "16px" }}>
                                    <Table.Summary.Cell index={0} colSpan={2}>Total</Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}><Text><MonetaryOutput value={totalProventos} /></Text></Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}><Text><MonetaryOutput value={totalDescontos} /></Text></Table.Summary.Cell>
                                </Table.Summary.Row>
                                <Table.Summary.Row style={{ textAlign: "center", fontSize: "18px" }}>
                                    <Table.Summary.Cell index={0} colSpan={2}>Total líquido</Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} colSpan={2}>R$ <MonetaryOutput value={totalProventos - totalDescontos} /></Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }} />
            </Card>
        </div>
    )
}