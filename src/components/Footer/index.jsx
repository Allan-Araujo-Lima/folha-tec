import { Layout, Tag } from "antd"
const { Footer } = Layout

import "./styles.css"

export const FooterExp = () => {
    return (
        <Footer className="footer" style={{ textAlign: 'center', backgroundColor: '#4d5891', overflowX: 'hidden' }}>
            <p>FolhaTec © {new Date().getFullYear()} Creted by <a style={{ textDecoration: 'none', color: 'black', padding: '0' }} href="https://www.linkedin.com/in/allan-araujo-lima/" target="_blank"><b>Allan Araujo</b></a></p>
        </Footer >
    )
}