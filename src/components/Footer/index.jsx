import { Layout } from "antd"

const { Footer } = Layout

export const FooterExp = () => {
    return (
        <Footer style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>
            FolhaTec © {new Date().getFullYear()} Creted by Allan Araujo
        </Footer>
    )
}