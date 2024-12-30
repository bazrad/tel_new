import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

const PaymentForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/payments/make-payment`, values);
      message.success('АмжилттаЙ цэнэглдээ !');
      form.resetFields();
    } catch (error) {
      console.log('Payment error:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };

  return (
    <Card title="Утасны төлбөр төлөх" style={{ maxWidth: 500, margin: '0 auto' }}>
      <Form
        form={form}
        name="payment"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Утасны дугаар"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Утасны дугаар оруулна уу!' },
            { pattern: /^\d{8}$/, message: 'Утасны дугаар 8 оронтой тоо байх ёстой!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Цэнэглэх дүн"
          name="amount"
          rules={[{ required: true, message: 'Цэнэглэх дүн оруулна уу!' }]}
        >
          <Input type="number" min="1" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Цэнэглэх
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PaymentForm;