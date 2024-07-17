import { useState, useRef } from 'react'
import './styles.css'

export const HoraExtra = () => {
    const [selectedOption, setSelectecOption] = useState("")
    const [horaExtraResult, setHoraExtraResult] = useState(null)
    const [horas, setHoras] = useState(null)

    const submit = (e) => {
        e.preventDefault()

        const formData = Object.fromEntries(new FormData(e.target))

        console.log(formData)

        let insalubridadeValue = 0;
        let periculosidadeValue = 0;
        let salarioTotal = Number(formData.salario)

        if (formData.adicionais == 'insalubridade') {
            insalubridadeValue = formData.salario * formData.insalubridade / 100;
            salarioTotal += Number(insalubridadeValue)
        } else if (formData.adicionais == 'periculosidade') {
            periculosidadeValue = formData.salario * formData.periculosidade / 100;
            salarioTotal += Number(periculosidadeValue)
        }

        let result = salarioTotal / formData.cargahoraria * (formData.horaextra / 100 + 1) * formData.quantidadehoras;

        setHoraExtraResult(result)
        setHoras(formData.quantidadehoras)

    }

    return (
        <div style={{ height: '100%' }}>
            <div className="hora-extra">
                <form className="container-hora-extra" id="container-hora-extra" onSubmit={submit}>
                    <h1>Hora Extra</h1>
                    <div className="form-item">
                        <label htmlFor="salario">Salário base: </label>
                        <input type="number" placeholder="Digite seu salário atual" id="salario" name="salario" required="True" />
                    </div>
                    <div className="form-item">
                        <label htmlFor="adicionais">Adicionais: </label>
                        <select id="adicionais" name="adicionais" className="adicionais" onChange={(e) => setSelectecOption(e.target.value)}>
                            <option value="">Nenhum</option>
                            <option value="insalubridade">Insalubridade</option>
                            <option value="periculosidade">Periculosidade</option>
                        </select>
                    </div>

                    {
                        selectedOption == 'insalubridade' ?
                            <div id="insalubridade" className="insalubridade form-item">
                                <label htmlFor="insalubridade">Adicional de Insalubridade: </label>
                                <input defaultValue={20} type="number" name="insalubridade" required="True" />
                                <label>%</label>
                            </div>
                            :
                            null
                    }

                    {
                        selectedOption == 'periculosidade' ?
                            <div id="periculosidade" className="periculosidade form-item">
                                <label htmlFor="periculosidade">Adicional de Perirculosidade: </label>
                                <input defaultValue="30" type="number" name="periculosidade" required="True" />
                                <label>%</label>
                            </div>
                            :
                            null
                    }

                    <div className="form-item">
                        <label htmlFor="cargahoraria">Horas Mensais: </label>
                        <input type="number" placeholder="Hora(s)" name="cargahoraria" required="True" defaultValue={220} />
                        <label> hora(s)</label>
                    </div>
                    <div className="form-item">
                        <label htmlFor="horaextra">Adicional Hora Extra: </label>
                        <input type="number" defaultValue={50} name="horaextra" required="True" />
                        <label>%</label>
                    </div>

                    <div className="form-item">
                        <label htmlFor="quantidadehoras">Horas extras: </label>
                        <input type="number" placeholder="Hora(s)" name="quantidadehoras" required="True" defaultValue={1} />
                        <label> hora(s)</label>
                    </div>
                    <div className="calculate">
                        <button className="calculate-btn" id="calculate-btn" type="submit">Calcular</button>
                    </div>
                </form>
                {horaExtraResult !== null && (
                    <div className="result">
                        <h1>Resultado</h1>
                        <p>O colaborador receberia <b>R$ {horaExtraResult.toFixed(2)}</b> referente a(s) {horas} hora(s) extra trabalhadas.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
