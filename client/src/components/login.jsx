import React, { useState } from "react";
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

    const handleLogin = async () => {
        console.log("Username:", username);
        console.log("Password:", password);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/worker/login`, {
                username: username,
                password: password
            });
            console.log(response);
            if (response.data.data) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                navigate("/station");
            } else {
                notification.error({ message: "Нэвтрэх нэр эсвэл нууц үг буруу байна!" });
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
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
                    height: "100vh", // Full height of the viewport
                    padding: "10px",
                }}
            >
                <Col
                    xs={20}  // Set a smaller width for small devices
                    sm={18}  // Further adjust for slightly larger screens
                    md={16}  // Medium-sized screens, still small
                    lg={12}  // Large screens with a narrower width
                    xl={10}  // Extra large screens, even more narrow
                    style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "#fff",
                        borderRadius: "8px", // Rounded corners for the form
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Add a subtle shadow
                    }}
                >
                    <div>
                        <img
                            src="../../public/image.jpg" // Ensure the path is correct
                            alt="Login Illustration"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                maxHeight: "400px", // Limit the height to prevent overflow
                                borderRadius: "8px", // Optional for rounded corners
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
                                visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
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
                <Col>
                    <div
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default LoginForm;
