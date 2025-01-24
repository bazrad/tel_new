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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const columns = [
    { title: '№', dataIndex: 'number', key: 'number', render: (_text, _record, index) => index + 1 },
    { title: 'Нэр', dataIndex: 'name', key: 'name' },
    {
      title: 'Утасны дугаар',
      dataIndex: 'phones',
      key: 'phones',
      render: (phones) => (phones || []).map((phone) => phone.phone_number).join(', '),
    },
    { title: 'Хаяг', dataIndex: 'address', key: 'address' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Төрөл', dataIndex: 'type', key: 'type' },
    { title: 'Салбар нэгж', dataIndex: 'branch', key: 'branch' },
    { title: 'Станц', dataIndex: 'station', key: 'station' },
    { title: 'Хөнгөлөлт', dataIndex: 'discount', key: 'discount' },
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
    fetchClients();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/client`);
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
      ['name', 'address', 'id'].some((key) =>
        String(client[key] || '').toLowerCase().includes(value.toLowerCase())
      ) ||
      (client.phones || []).some((phone) =>
        phone.phone_number.toLowerCase().includes(value.toLowerCase())
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
      fetchClients();
    } catch (error) {
      console.error('Error adding client:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };

  const handleEditClient = (record) => {
    setIsEditMode(true);
    setEditingClient(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleUpdateClient = async (values) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/client/${editingClient.id}`, values);
      message.success('Амжилттай засварлалаа!');
      setIsModalVisible(false);
      form.resetFields();
      setIsEditMode(false);
      fetchClients();
    } catch (error) {
      console.error('Error updating client:', error);
      message.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/client/${id}`);
      message.success('Амжилттай устгалаа!');
      fetchClients();
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
          onSearch={handleSearch}
        />
        <Button
          type="primary"
          onClick={() => {
            setIsEditMode(false);
            setIsModalVisible(true);
            form.resetFields();
          }}
        >
          Хэрэглэгч нэмэх
        </Button>
      </div>

      <Modal
        title={isEditMode ? "Хэрэглэгч засварлах" : "Хэрэглэгч нэмэх"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={isEditMode ? handleUpdateClient : handleAddClient}
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
            <Select
              showSearch
              placeholder="Утасны дугаар сонгоно уу"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  label: <span>manager</span>,
                  title: 'manager',
                  options: [
                    { value: "880011", label: "880011", },
                    { value: "990022", label: "990022" },
                  ],
                },
                { value: "990022", label: "990022" },
                { value: "990044", label: "990044" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Хаяг"
            name="address"
            rules={[{ required: true, message: 'Хаяг оруулна уу!' }]}
          >
            <Select
              showSearch
              placeholder="Хаяг сонгоно уу"
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) =>
              //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              // }
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { value: "Улаанбаатар", label: "Улаанбаатар" },
                { value: "Дархан", label: "Дархан" },
                { value: "Эрдэнэт", label: "Эрдэнэт" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
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
          locale: {
            items_per_page: 'хуудас', // Зөвлөгөө: "item_per_page" биш, "items_per_page" ашиглана.
          },
        }}
        size="small"
        loading={loading}
        rowKey="id"
        onChange={handleTableChange}
      />

    </Card>
  );
};

export default Clients;
