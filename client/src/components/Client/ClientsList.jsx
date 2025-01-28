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
                  label: <span>Хэрэглэгчийн авч болох дугаар</span>,
                  title: 'Хэрэглэгчийн дугаар',
                  options: [

                    { value: "4492", label: "4492" },
                    { value: "40023", label: "40023" },
                    { value: "40033", label: "40033" },
                    { value: "40346", label: "40346" },
                    { value: "40643", label: "40643" },
                    { value: "40646", label: "40646" },
                    { value: "41163", label: "41163" },
                    { value: "41168", label: "41168" },
                    { value: "41186", label: "41186" },
                    { value: "41187", label: "41187" },
                    { value: "41196", label: "41196" },
                    { value: "41205", label: "41205" },
                    { value: "41246", label: "41246" },
                    { value: "42100", label: "42100" },
                    { value: "42101", label: "42101" },
                    { value: "42104", label: "42104" },
                    { value: "42105", label: "42105" },
                    { value: "42106", label: "42106" },
                    { value: "42107", label: "42107" },
                    { value: "42111", label: "42111" },
                    { value: "42113", label: "42113" },
                    { value: "42114", label: "42114" },
                    { value: "42120", label: "42120" },
                    { value: "42122", label: "42122" },
                    { value: "42123", label: "42123" },
                    { value: "42125", label: "42125" },
                    { value: "42126", label: "42126" },
                    { value: "42127", label: "42127" },
                    { value: "42130", label: "42130" },
                    { value: "42131", label: "42131" },
                    { value: "42132", label: "42132" },
                    { value: "42133", label: "42133" },
                    { value: "42141", label: "42141" },
                    { value: "42153", label: "42153" },
                    { value: "42160", label: "42160" },
                    { value: "42162", label: "42162" },
                    { value: "42195", label: "42195" },
                    { value: "42523", label: "42523" },
                    { value: "42554", label: "42554" },
                    { value: "42653", label: "42653" },
                    { value: "42671", label: "42671" },
                    { value: "42722", label: "42722" },
                    { value: "41107", label: "41107" },
                    { value: "43502", label: "43502" },
                    { value: "43503", label: "43503" },
                    { value: "40803", label: "40803" },
                    { value: "4447", label: "4447" },
                    { value: "4490", label: "4490" },
                    { value: "43750", label: "43750" },
                    { value: "44004", label: "44004" },
                  ],
                },
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
                {
                  label: <span>Хаягууд</span>,
                  title: 'Хаяг',
                  options: [
                    { value: "Хойд", label: "Хойд" },
                    { value: "Дулаан", label: "Дулаан" },
                    { value: "Сүхбаатар", label: "Сүхбаатар" },
                    { value: "Ерөө", label: "Ерөө" },
                    { value: "Дархан", label: "Дархан" },
                    { value: "Дархан-2", label: "Дархан-2" },
                    { value: "Орхон", label: "Орхон" },
                    { value: "Баруунхараа", label: "Баруунхараа" },
                    { value: "Эрхэт", label: "Эрхэт" },
                    { value: "Цайдам", label: "Цайдам" },
                    { value: "Энхтал", label: "Энхтал" },
                    { value: "Салхит", label: "Салхит" },
                    { value: "Хөтөл", label: "Хөтөл" },
                    { value: "Улаантолгой", label: "Улаантолгой" },
                    { value: "Эрдэнэт", label: "Эрдэнэт" },
                    { value: "Хангал", label: "Хангал" },
                    { value: "Орхонтуул", label: "Орхонтуул" },
                    { value: "Бэлэндалай", label: "Бэлэндалай" },
                    { value: "Зүүнхараа", label: "Зүүнхараа" },
                    { value: "Бэрх", label: "Бэрх" },
                    { value: "Үнэгт", label: "Үнэгт" },
                    { value: "Түнх", label: "Түнх" },
                  ],
                },
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
