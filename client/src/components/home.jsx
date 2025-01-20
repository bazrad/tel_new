import React from "react";
import { Layout, Typography, Button, Image } from "antd";
import { PhoneOutlined } from "@ant-design/icons"; // Ant Design icon

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
    return (
        <Layout style={{ minHeight: "90vh", backgroundColor: "white" }}>
            {/* Header */}
            <Header
                style={{
                    backgroundColor: "#001529",
                    color: "white",
                    display: "flex", // Enable Flexbox
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    height: "64px", // Set a consistent height
                    borderRadius: "5px",
                }}
            >
                <Title level={3} style={{ color: "white", margin: 0 }}>
                    TELEPHONE BILLING SYSTEM
                </Title>
            </Header>


            {/* Content */}
            <Content
                style={{
                    padding: "50px",
                    textAlign: "center",
                }}
            >
                {/* Icon */}
                <PhoneOutlined style={{ fontSize: "64px", color: "#1890ff", marginBottom: "20px" }} />


                {/* Text */}
                <Title level={1} style={{ color: "#1890ff" }}>
                    Welcome to Our Billing System!
                </Title>
                <Paragraph>
                    Телефон утасны төлбөр тооцоог бодох систем.
                </Paragraph>
            </Content>

            {/* Footer */}
            <Footer style={{
                textAlign: "center",
                backgroundColor: "#f0f2f5",
                borderRadius: "5px",
            }}>
                УБТЗ ХНН ©2025
            </Footer>
        </Layout>
    );
};

export default HomePage;
