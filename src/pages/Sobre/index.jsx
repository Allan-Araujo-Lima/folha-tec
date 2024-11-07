import { Link } from "react-router-dom"
import "./styles.css"
import { Card } from "antd"

export const Sobre = () => {
    return (
        <div className="container-sobre">
            <Card className="sobre" title="Sobre">
                <h2>História</h2>
                <p>Nascida em Juazeiro do Norte - CE, em busca de uma fusão entre tecnolgia e folha de
                    pagamento, a FolhaTec busca principalmente a facilitação do
                    departamento pessoal em geral, fazendo com que a rotina das pessoas que trabalham
                    neste segmento seja facilitada ao máximo.
                </p>
                <h2>Cálculos</h2>
                <p>
                    Sabemos que o pagamento de verbas trabalhistas em geral pode causar dúvidas até mesmo
                    aos profissionais mais experiências, desta forma, também disponibilizamos a nossa aba
                    de <Link className="link" to={"/calculadoras"}>calculadoras</Link>, para que conferências e parametrizações
                    possam ser realizadas.
                </p>
            </Card>
        </div >
    )
}
