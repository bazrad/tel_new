import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const Clients = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: 'Нэр',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Утасны дугаар',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
  ];

  useEffect(() => {

    fetchPayments();
  }, []);
  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/client`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (value) => {
    console.log('value:', value);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/client`, value);
      message.success('Амжилттай  client үүслээ !');
      setIsModalVisible(false);
      fetchPayments();

    } catch (error) {
      console.log('client error:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  }
  return (
    <Card title="Хэрэглэгчийн мэдээлэл">
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        className="mb-2 mr-auto ml-auto  "
      >
        Хэрэглэгч нэмэх
      </Button>

      <Modal
        title="Хэрэглэгч нэмэх"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleAddClient}
        >
          <Form.Item
            label="Нэр"
            name="name"
            rules={[{ required: true, message: 'Нэрээ оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Утасны дугаар"
            name="phone_number"
            rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Хэрэглэгчийн төрөл"
            name="client_type"
            rules={[{ required: true, message: 'Төрөл сонгох хэсэг!' }]}
          >
            <Select defaultValue={2}>
              <Select.Option value={1}>Дараа төлбөрт</Select.Option>
              <Select.Option value={2}>Урьдчилсан төлбөрт</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Нэмж турших
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={payments}
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default Clients;