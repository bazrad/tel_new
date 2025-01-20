import React, { useState } from 'react';
import { Table, Button, Form, InputNumber, Modal, Space, message, Select } from 'antd';

const CallTariffTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      minuteStart: 0,
      minuteEnd: 10,
      price: 100,
      no: 1,
      tariffType: 'Standard',
      totalCost: 1000,
    },
    {
      key: '2',
      minuteStart: 11,
      minuteEnd: 20,
      price: 120,
      no: 2,
      tariffType: 'Premium',
      totalCost: 1200,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const showModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const totalMinutes = values.minuteEnd - values.minuteStart;
        const totalCost = totalMinutes * values.price;
        if (editingRecord) {
          setDataSource((prevData) =>
            prevData.map((item) =>
              item.key === editingRecord.key ? { ...item, ...values, totalCost } : item
            )
          );
          message.success('Tariff rule updated!');
        } else {
          const newRecord = { ...values, key: Date.now(), totalCost };
          setDataSource((prevData) => [...prevData, newRecord]);
          message.success('New tariff rule added!');
        }
        setIsModalVisible(false);
        setEditingRecord(null);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const handleDelete = (key) => {
    setDataSource((prevData) => prevData.filter((item) => item.key !== key));
    message.success('Tariff rule deleted!');
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '1-р хугацаа',
      children: [
        {
          title: 'Хугацаа',
          dataIndex: 'minuteStart',
          key: 'minuteStart',
          render: (_, record) => (
            <InputNumber
              value={record.minuteStart}
              onChange={(value) => {
                const newData = [...dataSource];
                const index = newData.findIndex((item) => item.key === record.key);
                if (index > -1) {
                  newData[index].minuteStart = value;
                  setDataSource(newData);
                }
              }}
            />
          ),
        },
      ],
    },
    {
      title: '2-р хугацаа',
      children: [
        {
          title: 'Хугацаа',
          dataIndex: 'minuteEnd',
          key: 'minuteEnd',
          render: (_, record) => (
            <InputNumber
              value={record.minuteEnd}
              onChange={(value) => {
                const newData = [...dataSource];
                const index = newData.findIndex((item) => item.key === record.key);
                if (index > -1) {
                  newData[index].minuteEnd = value;
                  setDataSource(newData);
                }
              }}
            />
          ),
        },
      ],
    },
    {
      title: 'Хугацаа (төгрөг)',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <InputNumber
          value={record.price}
          onChange={(value) => {
            const newData = [...dataSource];
            const index = newData.findIndex((item) => item.key === record.key);
            if (index > -1) {
              newData[index].price = value;
              setDataSource(newData);
            }
          }}
        />
      ),
    },
    {
      title: 'Tariff Type',
      dataIndex: 'tariffType',
      key: 'tariffType',
      render: (_, record) => (
        <Select
          value={record.tariffType}
          onChange={(value) => {
            const newData = [...dataSource];
            const index = newData.findIndex((item) => item.key === record.key);
            if (index > -1) {
              newData[index].tariffType = value;
              setDataSource(newData);
            }
          }}
        >
          <Select.Option value="Standard">Standard</Select.Option>
          <Select.Option value="Premium">Premium</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Засах
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Устгах
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Tariff Rule
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50'],
          showQuickJumper: false,
          locale: {
            items_per_page: 'хуудас',
          },
        }}
      />
      <Modal
        title={editingRecord ? 'Edit Tariff Rule' : 'Add Tariff Rule'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="no"
            label="№"
            rules={[{ required: true, message: 'Please enter the serial number' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} placeholder="Serial number" />
          </Form.Item>
          <Form.Item
            name="minuteStart"
            label="Minute Range Start"
            rules={[{ required: true, message: 'Please enter the start minute' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} placeholder="Start minute" />
          </Form.Item>
          <Form.Item
            name="minuteEnd"
            label="Minute Range End"
            rules={[
              { required: true, message: 'Please enter the end minute' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value > getFieldValue('minuteStart')) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('End minute must be greater than start minute'));
                },
              }),
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} placeholder="End minute" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price per Minute (Tugriks)"
            rules={[{ required: true, message: 'Please enter the price per minute' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} placeholder="Price in tugriks" />
          </Form.Item>
          <Form.Item
            name="tariffType"
            label="Tariff Type"
            rules={[{ required: true, message: 'Please select the tariff type' }]}
          >
            <Select placeholder="Select a tariff type">
              <Select.Option value="Standard">Standard</Select.Option>
              <Select.Option value="Premium">Premium</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CallTariffTable;
