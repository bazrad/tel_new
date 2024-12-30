import React from 'react';
import { Form, Input, Button, Card, InputNumber, message } from 'antd';
import { PhoneOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';

const Example2 = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      message.success('Payment successful!');
      form.resetFields();
    } catch (error) {
      message.error('Payment failed. Please try again.');
      console.error('Payment error:', error);
    }
  };

  return (
    <Card title="Жишээ форм base-тай холбогдоогүй" style={{ maxWidth: 500, margin: '20px auto' }}>
      <Form
        form={form}
        name="payment"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="phoneNumber"
          label="Утасны дугаар"
          rules={[
            { required: true, message: 'Дугаараа оруулна уу ?' },
            { pattern: /^\d{10}$/, message: 'Тоогоор бичнэ үү' }
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Дугаараа оруулна уу"
          />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Дүн"
          rules={[
            { required: true, message: 'Дүн буруу' },
            { type: 'number', min: 1, message: 'Amount must be greater than 0' }
          ]}
        >
          <InputNumber
            prefix={<DollarOutlined />}
            style={{ width: '100%' }}
            placeholder="Төлбөрийн дүн"
          />
        </Form.Item>

        <Form.Item
          name="customerName"
          label="Хэрэглэгчийн нэр"
          rules={[
            { required: true, message: 'Нэр буруу байна.' },
            { min: 2, message: 'Нэр буруу байна!!!' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Нэрээ оруулна уу"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Илгээх
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Example2;