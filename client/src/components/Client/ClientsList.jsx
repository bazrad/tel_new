import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, message, Select, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredClients, setFilteredClients] = useState([]);
  const [form] = Form.useForm();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
    },
  });
  const [isEditMode, setIsEditMode] = useState(false); // Add state to track edit mode
  const [editingClient, setEditingClient] = useState(null); // To store the client being edited

  const columns = [
    { title: '№', dataIndex: 'number', key: 'number', render: (_text, _record, index) => index + 1, },
    { title: 'Нэр', dataIndex: 'name', key: 'name' },
    {
      title: 'Утасны дугаар',
      dataIndex: 'phones',
      key: 'phones',
      render: (phones) => phones.map((phone) => phone.phone_number).join(', '),
    },
    { title: 'ХАЯГ', dataIndex: 'address', key: 'address' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'ТӨРӨЛ', dataIndex: 'type', key: 'type' },
    { title: 'САЛБАР НЭГЖ', dataIndex: 'branch', key: 'branch' },
    { title: 'СТАНЦ', dataIndex: 'station', key: 'station' },
    { title: 'ХӨНГӨЛӨЛТ', dataIndex: 'discount', key: 'discount' },
    {
      title: 'Үйлдэл',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditClient(record)}
          />
          <Popconfirm
            title="Та энэ мөрийг устгахдаа итгэлтэй байна уу?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDeleteClient(record.id)}
            onCancel={() => message.info('Устгах үйлдлийг цуцаллаа.')}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchClient();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

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
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/client`, values);
      message.success('Амжилттай хэрэглэгч үүслээ!');
      setIsModalVisible(false);
      form.resetFields();
      fetchClient();
    } catch (error) {
      console.error('Client error:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };

  const handleEditClient = (record) => {
    setIsEditMode(true); // Set to edit mode
    setEditingClient(record); // Set client to be edited
    form.setFieldsValue(record); // Populate form fields with the client's data
    setIsModalVisible(true); // Open the modal
  };

  const handleUpdateClient = async (values) => {
    try {
      console.log('editing')
      await axios.put(`${import.meta.env.VITE_API_URL}/client/${editingClient.id}`, values);
      message.success('Амжилттай засварлалаа!');
      setIsModalVisible(false);
      form.resetFields();
      setIsEditMode(false); // Reset edit mode
      fetchClient();
    } catch (error) {
      console.error('Error updating client:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/client/${id}`);
      message.success('Амжилттай устгалаа!');
      fetchClient();
    } catch (error) {
      console.error('Error deleting client:', error);
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
          size="middle"
          onSearch={handleSearch}
        />
        <Button
          type="primary"
          onClick={() => {
            setIsEditMode(false); // Switch to add mode
            setIsModalVisible(true);
            form.resetFields();
          }}
          className="bg-green-400"
        >
          Хэрэглэгч нэмэх
        </Button>
      </div>

      <Modal
        title={isEditMode ? "Хэрэглэгч засварлах" : "Хэрэглэгч нэмэх"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields(); // Clear form when closing modal
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={isEditMode ? handleUpdateClient : handleAddClient}>
          <Form.Item label="НЭР" name="name" rules={[{ required: true, message: 'Нэрээ оруулна уу!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="УТАСНЫ ДУГААР"
            name="phone_number"
            rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
          >
            <Select placeholder="Утасны дугаар сонгоно уу">
              <Select.Option value="880011">880011</Select.Option>
              <Select.Option value="990022">990022</Select.Option>
              <Select.Option value="990044">990044</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="ХАЯГ"
            name="address"
            rules={[{ required: true, message: 'ХАЯГ оруулна уу!' }]}
          >
            <Select placeholder="Хаяг сонгоно уу">
              <Select.Option value="Улаанбаатар">Улаанбаатар</Select.Option>
              <Select.Option value="Дархан">Дархан</Select.Option>
              <Select.Option value="Эрдэнэт">Эрдэнэт</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-green-400">
              {isEditMode ? "Засах" : "Нэмэх"}
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
        size='small'
        loading={loading}
        rowKey="id"
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default Clients;
