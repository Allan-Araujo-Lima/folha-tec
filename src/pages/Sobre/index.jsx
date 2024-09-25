import { Link } from "react-router-dom"
import "./styles.css"
import { Card, Space } from "antd"

export const Sobre = () => {
    return (
        <div className="containersobre">
            <Card className="sobre" title="Sobre">
                <Card title="História" className="historia" size="small">
                    <p>Nascida em Juazeiro do Norte - CE, em busca de uma fusão entre tecnolgia e folha de
                        pagamento, a FolhaTec busca principalmente a facilitação do
                        departamento pessoal em geral, fazendo com que a rotina das pessoas que trabalham
                        neste segmento seja facilitada ao máximo.
                    </p>
                </Card>
                <Card title="Cálculos" className="calculos" size="small">
                    <p>
                        Sabemos que o pagamento de verbas trabalhistas em geral pode causar dúvidas até mesmo
                        aos profissionais mais experiências, desta forma, também disponibilizados a nossa aba
                        de <Link className="link" to={"/calculadoras"}>calculadoras</Link>, para que conferências e parametrizações
                        possam ser realizadas.
                    </p>
                </Card>
            </Card>
        </div >
    )
}
