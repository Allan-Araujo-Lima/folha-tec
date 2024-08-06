const faixasInss = [1412, 2666.08, 4000.03, 7786.02];
const aliquotasInss = [7.5, 9, 12, 14];
const deducaoInss = [0, 21.18, 101.18, 181.18];

const faixasIrrf = [4664.68, 3751.06, 2826.6, 2259.21]
const aliquotasIrrf = [27.5, 22.5, 15, 7.5]
const deducaoIrrf = [896, 662.77, 381.44, 169.44]

const descontoSimplificado = 564.8
const descontoPorDependente = 189.59

export function salarioFamilia(base) {
    return 62.04 * base
}

export function inss(base) {
    let inssDesconto = 0;

    for (let i = 0; i < faixasInss.length; i++) {
        if (base <= faixasInss[i]) {
            inssDesconto = base * aliquotasInss[i] / 100 - deducaoInss[i]
            break
        }
    }
    inssDesconto == 0 ? inssDesconto += 908.86 : inssDesconto
    return inssDesconto
}

export function irrf(base, dependente, pensao, inss) {
    let irrfDesconto = 0;
    let descontoDependente = dependente * descontoPorDependente
    let baseAliquota = base - descontoDependente - pensao - inss;
    let desconto = descontoSimplificado;

    if ((baseAliquota > faixasIrrf[faixasIrrf.length - 1]) || (base - descontoSimplificado) > faixasIrrf[faixasIrrf.length - 1]) {
        if (descontoDependente + pensao + inss > descontoSimplificado) {
            desconto = descontoDependente + pensao + inss;
        }
        for (let i = 0; i < faixasIrrf.length; i++) {
            if (base - desconto >= faixasIrrf[i]) {
                irrfDesconto = (base - desconto) * aliquotasIrrf[i] / 100 - deducaoIrrf[i];
                break
            }
        }
    }
    return irrfDesconto
}

export function dsr(base, diasUteis, diasNaoUteis) {
    return (base / diasUteis * diasNaoUteis)
}