import dayjs from "dayjs"

import { fgts, inss, irrf, SalarioMinimo } from "."
import { MonetaryOutput } from "./inputMask";

const rescisoesAviso = ["semJustaCausa", "pedidoDemissao", "rescisaoCulpaReciproca", "rescisaoCulpaEmpregador", "rescisaoAcordoPartes"]
const indExperiencia = ["rescisaoAntecipaContratoExperienciaEmpregador", "rescisaoAntecipaContratoExperienciaEmpregado"]

const dataFormat = "DD/MM/YYYY";

export function rescisao(info) {

    let data = [];
    let dataFgts = [];
    let counter = 0;

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
    console.log(diferencaAnoAdmissaoDemissao)
    const inicioFeriasVencidas = dayjs(info.dataAdmissao).add(diferencaAnoAdmissaoDemissao, "year");
    const finalFeriasVencidas = dayjs(info.dataAdmissao).add(1, "year").subtract(1, "day");
    console.log(dayjs(finalFeriasVencidas).format(dataFormat))
    console.log(inicioFeriasVencidas)
    let feriasVencidas = 0
    let tercoFeriasVencidas
    const quantidadeAvosFeriasVencidas = info.feriasVencidas ? 30 - info.feriasVencidas / 2.5 : 12;
    if (dayjs(finalFeriasVencidas).isBefore(dataDemissao)) {
        feriasVencidas = baseFeriasVencidas / 12 * quantidadeAvosFeriasVencidas;
        tercoFeriasVencidas = feriasVencidas / 3;
    }

    // Férias proporcionais
    const inicioFeriasProporcionais = dayjs(inicioFeriasVencidas, dataFormat).add(1, "year");
    let periodoProporcionalMes = dayjs(dataDemissao).diff(inicioFeriasProporcionais, "month");
    const diasFeriasMesRescisao = dayjs(dataDemissao).diff(dayjs(inicioFeriasProporcionais).add(periodoProporcionalMes, "month"), "day") + 1 >= 15
    if (diasFeriasMesRescisao) {
        periodoProporcionalMes++
    };
    const quantidadeAvosFeriasProporcionais = info.feriasColetivas ? periodoProporcionalMes * 2.5 - info.feriasColetivas : periodoProporcionalMes * 2.5;
    const feriasProporcionais = info?.tipoDeRescisao !== "porJustaCausa" ? baseFeriasProporcionais / 30 * quantidadeAvosFeriasProporcionais : 0;
    const tercoFeriasProporcionais = info?.tipoDeRescisao !== "porJustaCausa" ? feriasProporcionais / 3 : 0;

    // Férias porporcionais indenizadas
    let avosFeriasIndenizadas = 0;
    let feriasIndenizadas = 0;
    let tercoFeriasIndenizadas = 0;
    if (projecaoAviso) {
        if (diasFeriasMesRescisao === false) {
            avosFeriasIndenizadas++;
            periodoProporcionalMes++;
        }
        counter = 0
        while (dayjs(projecaoAviso).diff(dayjs(inicioFeriasProporcionais).add(periodoProporcionalMes + counter, "month"), "month") !== 0) {
            if (dayjs(projecaoAviso).diff(dayjs(inicioFeriasProporcionais).add(periodoProporcionalMes + counter, "month"), "day") + 1 >= 15) {
                avosFeriasIndenizadas++;
            }
            counter++;
        }
        console.log(dayjs(projecaoAviso).diff(dayjs(inicioFeriasProporcionais).add(periodoProporcionalMes + counter, "month"), "day") + 1)
        feriasIndenizadas = baseFeriasProporcionais / 12 * avosFeriasIndenizadas;
        tercoFeriasIndenizadas = feriasIndenizadas / 3;
    };

    // 13° salário
    let avosDecimo = 0;

    let inicioDecimo = dayjs(dataDemissao).startOf("year");
    if (dayjs(info.dataAdmissao).isAfter(dayjs(inicioDecimo))) {
        inicioDecimo = dayjs(info.dataAdmissao);
        // Verifica se trabalhou mais de 15 dias no mês da admissão
        if (dayjs(dayjs(inicioDecimo).endOf("month")).diff(inicioDecimo, "day") + 1 >= 15 && dayjs(dataDemissao).isAfter(inicioDecimo)) {
            avosDecimo++;
            counter++;
        }
    };

    // Calcula os avos de décimo terceiro
    while (dayjs(inicioDecimo).add(counter, "month").startOf("month").diff(dataDemissao, "day") >= 15)
        avosDecimo++;

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

        if (dayjs(dataDemissao).diff(comecoMesRescisao, "day") + 1 < 15) {
            avosDecimoIndenizado++;
        };
    }
    const valorDecimoIndenizado = baseDecimo / 12 * avosDecimoIndenizado

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

    // FGTS
    const aliquotaFgts = info.categoriaEmpregado !== "aprendiz" ? 8 : 2;
    const baseCalculoFgts = saldoSalario + saldoInsalubridade + saldoPericulosidade + valorAviso + valorDecimo + valorDecimoIndenizado;
    const fgtsRescisao = fgts(baseCalculoFgts, aliquotaFgts)

    // Multa FGTS
    let aliquotaMultaFgts = 0;
    if (info.tipoDeRescisao === "semJustaCausa" || info.tipoDeRescisao === "rescisaoAntecipaContratoExperienciaEmpregador") {
        aliquotaMultaFgts = 40;
    } else if (info.tipoDeRescisao === "rescisaoAcordoPartes") {
        aliquotaMultaFgts = 20;
    }
    const baseMultaFgts = info.fgts ? info.fgts + fgtsRescisao : fgtsRescisao;
    const multaFgts = fgts(baseMultaFgts, aliquotaMultaFgts);

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
            evento: "Férias Indenizadas",
            referencia: `${avosFeriasIndenizadas}/12`,
            valor: feriasIndenizadas,
            provento: true,
        },
        {
            evento: "Terço Férias Indenizadas",
            referencia: null,
            valor: tercoFeriasIndenizadas,
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
            referencia: `${inssSaldoSalario.aliquota}%`,
            valor: inssSaldoSalario.inss,
            provento: false,
        },
        {
            evento: "IRRF Rescisão",
            referencia: `${irrfSaldoSalario.aliquota}%`,
            valor: irrfSaldoSalario.irrf,
            provento: false,
        },
        {
            evento: "INSS 13° Salário",
            referencia: `${inssDecimo.aliquota}%`,
            valor: inssDecimo.inss,
            provento: false,
        },
        {
            evento: "IRRF 13° Salário",
            referencia: `${irrfDecimo.aliquota}%`,
            valor: irrfDecimo.irrf,
            provento: false,
        },
    ];

    const resultFgts = [
        {
            tipo: "FGTS Rescisão",
            base: baseCalculoFgts,
            aliquota: `${aliquotaFgts}%`,
            valor: fgtsRescisao,
        },
        {
            tipo: "Multa do FGTS",
            base: baseMultaFgts,
            aliquota: `${aliquotaMultaFgts}%`,
            valor: multaFgts,
        },
    ]

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
    };

    keyNumber = 0;
    for (let i = 0; i < resultFgts.length; i++) {
        keyNumber += 1;
        dataFgts.push({
            key: keyNumber,
            tipo: resultFgts[i].tipo,
            base: <MonetaryOutput value={resultFgts[i].base} />,
            aliquota: resultFgts[i].aliquota,
            valor: <MonetaryOutput value={resultFgts[i].valor} />,
            valorSoma: resultFgts[i].valor,
        })
    }
    return {
        data: data,
        dataFgts: dataFgts
    }
};