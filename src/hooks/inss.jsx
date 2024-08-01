const faixas = [1412, 2666.08, 4000.03, 7786.02];
const aliquotasInss = [7.5, 9, 12, 14];
const deducaoInss = [0, 21.18, 101.18, 181.18];

const descontoSimplificado = 564.8

export function inss(base) {
    let inssDesconto = 0;

    for (let i = 0; i < faixas.length; i++) {
        if (base <= faixas[i]) {
            inssDesconto += base * aliquotasInss[i] / 100 - deducaoInss[i]
            break
        }
    }
    inssDesconto == 0 ? inssDesconto += 908.86 : inssDesconto
    return inssDesconto;
}