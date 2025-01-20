import React from 'react';
import { Result, Button, Typography, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FrownOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/login');
    };

    return (
        <Result
            icon={
                <Image
                    width={200}
                    src="https://i.imgur.com/qIufhof.png" // Replace with your funny 404 image URL
                    alt="Funny 404"
                    preview={false}
                />
            }
            title="404 - Хуудас олдсонгүй!"
            subTitle={
                <div>
                    <Paragraph>
                        <Text type="danger">"Ийм хуудал хараахан байхгүй байна."</Text>
                    </Paragraph>
                    <Paragraph>
                        <FrownOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                        Ta нэвтрэх хэсгээр нэвтэрч орно уу
                    </Paragraph>
                </div>
            }
            extra={
                <Button type="primary" onClick={goHome}>
                    Нэвтрэх хэсэгт очих.
                </Button>
            }
        />
    );
};

export default NotFoundPage;
