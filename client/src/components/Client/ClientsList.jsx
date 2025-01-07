import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';

const { Search } = Input;

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredClients, setFilteredClients] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true, // Хуудас хэмжээ сонгох боломжийг харуулах
    },
  });

  const columns = [
    { title: '№', dataIndex: 'id', key: 'id', },
    { title: 'Нэр', dataIndex: 'name', key: 'name', },
    {
      title: 'Утасны дугаар', dataIndex: 'phones', key: 'phones',
      render: (phones) => phones.map((phone) => phone.phone_number).join(', '),
    },
    { title: 'ХАЯГ', dataIndex: 'address', key: 'address', },
    { title: 'ТӨРӨЛ', dataIndex: 'type', key: 'type', },
    { title: 'САЛБАР НЭГЖ', dataIndex: 'branch', key: 'branch', },
    { title: 'СТАНЦ', dataIndex: 'station', key: 'station', },
    { title: 'ХӨНГӨЛӨЛТ', dataIndex: 'discount', key: 'discount', },
    { title: 'ID', dataIndex: 'id', key: 'id', },
  ];

  useEffect(() => {
    fetchClient();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
  ]);

  const fetchClient = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/client`);
      setClients(response.data.data);
      setFilteredClients(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
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

  const handleAddClient = async (values) => {
    const { phone_number } = values;

    // Утасны дугаарыг шалгах
    const isValidPhone = /^(\+976)?[-\s]?(8|9|7)\d{5}$/.test(phone_number);

    if (!isValidPhone) {
      // Хэрэв утасны дугаар буруу бол алдаа мессеж гаргана
      message.error('Утасны дугаар буруу байна!');
      return; // Бүртгэл хийгдэхгүй
    }

    try {
      // Бүртгэх
      await axios.post(`${import.meta.env.VITE_API_URL}/client`, values);
      message.success('Амжилттай хэрэглэгч үүслээ!');
      setIsModalVisible(false);
      fetchClient();
    } catch (error) {
      console.error('Client error:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  return (
    <Card title="Хэрэглэгчийн жагсаалт">
      <div className="flex justify-between mb-2">
        <Search
          placeholder="Хайх текстээ оруулна уу"
          className="w-[25%]"
          allowClear
          enterButton="Хайх"
          onSearch={handleSearch}
        />
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          className="bg-green-400"
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
        <Form layout="vertical" onFinish={handleAddClient}>
          <Form.Item label="НЭР" name="name" rules={[{ required: true, message: 'Нэрээ оруулна уу!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="УТАСНЫ ДУГААР" name="phone_number" rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ХАЯГ" name="address" rules={[{ required: true, message: 'ХАЯГ оруулна уу!' }]}>
            <Input />
          </Form.Item>
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
        pagination={{
          ...tableParams.pagination,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50'],
          showQuickJumper: false,
          locale: {
            items_per_page: 'хуудас',
          },
        }}
        loading={loading}
        rowKey="id"
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default Clients;
