import { Layout, Tag } from "antd"
const { Footer } = Layout

export const FooterExp = () => {
    return (
        <Footer style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>
            <p>FolhaTec © {new Date().getFullYear()} Creted by <a style={{ textDecoration: 'none', color: 'black', padding: '0' }} href="https://www.linkedin.com/in/allan-araujo-lima/" target="_blank"><b>Allan Araujo</b></a></p>
        </Footer >
    )
}