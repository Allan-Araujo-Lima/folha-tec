import { Card } from "antd"
import { Link } from "react-router-dom"

import "./styles.css"

export const AvisoCalculo = () => {
    return (
        <Card className="AvisoCalculo"
            title={"Atenção!"}
            size="small"
            style={{ marginTop: "16px", backgroundColor: "#e9efff" }}
            bordered={false}
        >
            <p>Conforme descrito em nosso <Link to='/termo-de-uso' style={{ color: "#203165" }}>termo de uso</Link>, todos os cálculos efetuados têm finalidade consultiva, não sendo base para tomadas de decisão.</p>
        </Card>
    )
}