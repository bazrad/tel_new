import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Divider,
    Input,
    Checkbox,
    notification,
    Layout,
    Row,
    Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined, GoogleCircleFilled } from "@ant-design/icons";
import axios from "axios";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Clear token and user data upon visiting login page
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            notification.warning({ message: "Нэвтрэх нэр болон нууц үг шаардлагатай." });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/worker/login`, {
                username,
                password,
            });

            if (response.data.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.data));
                notification.success({ message: "Амжилттай нэвтэрлээ." });
                navigate("/");
            } else {
                notification.error({ message: "Нэвтрэх нэр эсвэл нууц үг буруу байна!" });
            }
        } catch (error) {
            // Check for known error codes
            if (error.response?.data?.code === "ELOGIN" || error.message.includes("Login failed")) {
                notification.error({ message: "Бүртгэлтэй хандалт алдаа гарлаа. Хэрэглэгчийн мэдээллээ шалгана уу." });
            } else {
                notification.error({ message: "Серверийн алдаа гарлаа. Дахин оролдоно уу." });
            }

            // Log detailed error to console for debugging
            console.error("Нэвтрэх үед алдаа гарлаа:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout className="container-login">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                    padding: "10px",
                }}
            >
                <Col
                    xs={20}
                    sm={18}
                    md={16}
                    lg={12}
                    xl={10}
                    style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <div>
                        <img
                            src="/image.jpg" // Adjusted the path for static assets
                            alt="Login Illustration"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                maxHeight: "400px",
                                borderRadius: "8px",
                            }}
                        />
                        <Typography.Title level={2} style={{ textAlign: "center" }}>
                            Telephone нэвтрэх
                        </Typography.Title>
                        <Divider />
                        <Input
                            placeholder="Нэвтрэх нэр"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <Input.Password
                            placeholder="Нууц үг"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            iconRender={(visible) =>
                                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                            }
                            style={{ marginBottom: "1rem" }}
                        />
                        <Checkbox style={{ marginBottom: "1rem" }}>Сануулах</Checkbox>
                        <Button type="primary" block onClick={handleLogin} loading={loading}>
                            Нэвтрэх
                        </Button>

                        <Divider>эсвэл</Divider>

                        <Button
                            type="default"
                            icon={<GoogleCircleFilled />}
                            block
                            onClick={() => console.log("CoSS бүртгэлээр нэвтрэх")}
                        >
                            CoSS бүртгэлээр нэвтрэх
                        </Button>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default LoginForm;
