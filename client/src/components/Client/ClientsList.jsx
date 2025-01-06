import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const { Search } = Input;

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredClients, setFilteredClients] = useState([]);

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Нэр',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Утасны дугаар',
      dataIndex: 'phones',
      key: 'phones',
      render: (phones) => phones.map((phone) => phone.phone_number).join(', '),

    },
    {
      title: 'ХАЯГ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'ТӨРӨЛ',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'САЛБАР НЭГЖ',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'СТАНЦ',
      dataIndex: 'station',
      key: 'station',
    },
    {
      title: 'ХӨНГӨЛӨЛТ',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
  ];

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/client`);
      console.log(response)
      setClients(response.data.data);
      setFilteredClients(response.data.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    const filteredData = clients.filter((client) =>
      ['name', 'address', 'phone_number', 'id'].some((key) =>
        String(client[key]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredClients(filteredData);
  };

  const handleAddClient = async (value) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/client`, value);
      message.success('Амжилттай хэрэглэгч үүслээ!');
      setIsModalVisible(false);
      fetchClient();
    } catch (error) {
      console.log('client error:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };

  return (
    <Card title="Хэрэглэгчийн жагсаалт">
      <div className='flex justify-between '>
        <Search
          placeholder="Хайх текстээ оруулна уу"
          className='mb-2 w-[25%]'
          allowClear
          enterButton="Хайх"
          size="50px"
          onSearch={handleSearch}
        />
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          className="mb-2 bg-green-400"
        >
          Хэрэглэгч нэмэх
        </Button>
      </div>

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
            label="НЭР"
            name="name"
            rules={[{ required: true, message: 'Нэрээ оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="УТАСНЫ ДУГААР"
            name="phone_number"
            rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'ID оруулна уу!' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="ХАЯГ"
            name="address"
            rules={[{ required: true, message: 'ХАЯГ оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="ТӨРӨЛ"
            name="type"
            rules={[{ required: true, message: 'ТӨРӨЛ оруулна уу!' }]}
          >
            <Input />
          </Form.Item> 
          <Form.Item
            label="САЛБАР НЭГЖ"
            name="branch"
            rules={[{ required: true, message: 'САЛБАР НЭГЖ оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="СТАНЦ"
            name="station"
            rules={[{ required: true, message: 'СТАНЦ оруулна уу!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ХӨНГӨЛӨЛТ"
            name="discount"
            rules={[{ required: true, message: 'ХӨНГӨЛӨЛТ оруулна уу!' }]}
          >
            <Input />
          </Form.Item>*/}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-green-400">
              Нэмж турших
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={filteredClients}
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default Clients;