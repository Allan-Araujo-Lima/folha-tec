import { Layout, Tag } from "antd"
const { Footer } = Layout

import "./styles.css"

export const FooterExp = () => {
    return (
        <Footer className="footer" style={{ textAlign: 'center', backgroundColor: '#203165', overflowX: 'hidden' }}>
            <p style={{ color: '#e9efff' }}>FolhaTec © {new Date().getFullYear()} Creted by <a style={{ textDecoration: 'none', color: '#e9efff', padding: '0' }} href="https://www.linkedin.com/in/allan-araujo-lima/" target="_blank"><b>Allan Araujo</b></a></p>
        </Footer >
    )
}