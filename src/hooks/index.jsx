export const SalarioMinimo = 1412;

const inssBase = [
    {
        aliquota: 7.5,
        faixa: 1412,
        deducao: 0
    },
    {
        aliquota: 9,
        faixa: 2666.08,
        deducao: 21.18
    },
    {
        aliquota: 12,
        faixa: 4000.03,
        deducao: 101.18
    },
    {
        aliquota: 14,
        faixa: 7786.02,
        deducao: 181.18
    }
]

const irrfBase = [
    {
        aliquota: 27.5,
        faixa: 4664.68,
        deducao: 896
    },
    {
        aliquota: 22.5,
        faixa: 3751.06,
        deducao: 662.77
    },
    {
        aliquota: 15,
        faixa: 2826.6,
        deducao: 381.44
    },
    {
        aliquota: 7.5,
        faixa: 2259.21,
        deducao: 169.44
    }
]

const CotaSalarioFamilia = 62.04
const descontoSimplificado = 564.8
const descontoPorDependente = 189.59

export function salarioFamilia(base) {
    return CotaSalarioFamilia * base
}

export function inss(base) {
    let inssDesconto = 0;
    let inssAliquota = 0;

    for (let i = 0; i < inssBase.length; i++) {
        if (base <= inssBase[i].faixa) {
            inssDesconto = base * inssBase[i].aliquota / 100 - inssBase[i].deducao
            inssAliquota = inssBase[i].aliquota;
            break
        }
    }

    if (inssDesconto == 0 && base !== 0) {
        inssDesconto = 908.86;
        inssAliquota = 14
    }

    return {
        inss: inssDesconto,
        aliquota: inssAliquota
    }
}

export function irrf(base, dependente, pensao, inss) {
    let irrfDesconto = 0;
    let irrfAliquota;
    let descontoDependente = dependente * descontoPorDependente;
    let baseAliquota = base - descontoDependente - pensao - inss;
    let desconto = descontoSimplificado;

    if ((baseAliquota > irrfBase[irrfBase.length - 1].faixa) || (base - descontoSimplificado) > irrfBase[irrfBase.length - 1].faixa) {
        if (descontoDependente + pensao + inss > descontoSimplificado) {
            desconto = descontoDependente + pensao + inss;
        }

        for (let i = 0; i < irrfBase.length; i++) {
            if (base - desconto >= irrfBase[i].faixa) {
                irrfDesconto = (base - desconto) * irrfBase[i].aliquota / 100 - irrfBase[i].deducao;
                irrfAliquota = irrfBase[i].aliquota;
                break
            }
        }
    }
    return {
        irrf: irrfDesconto,
        aliquota: irrfAliquota
    }
}

export function dsr(base, diasUteis, diasNaoUteis) {
    return (base / diasUteis * diasNaoUteis)
}

export function fgts(base, aliquota) {
    return base * aliquota / 100
}