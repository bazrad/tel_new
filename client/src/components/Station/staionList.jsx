import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'; // Icons импортлох
import axios from 'axios';

const { Search } = Input;

const Stations = () => {
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStation, setEditingStation] = useState(false);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            pageSizeOptions: ['10', '20', '30', '50'],
            showSizeChanger: true,
        },
    });

    const handleEdit = (record) => {
        setEditingStation(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/station/${id}`);
            message.success('Амжилттай устгагдлаа!');
            fetchStations();
        } catch (error) {
            console.error('Error deleting station:', error);
            message.error('Алдаа гарлаа! Дахин оролдоно уу.');
        }
    };


    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'БҮСИЙН ДУГААР', dataIndex: 'zone_number', key: 'zone_number' },
        { title: 'БҮСИЙН НЭР', dataIndex: 'zone_name', key: 'zone_name' },
        { title: 'СТАНЦЫН НЭР', dataIndex: 'name', key: 'name' },
        { title: 'ТРАНК(ХОЛБОХ ШУГАМУУД)', dataIndex: 'trunk_lines', key: 'trunk_lines' },
        { title: 'БАГТААМЖ', dataIndex: 'capacity', key: 'capacity' },
        {
            title: 'Үйлдэл',
            key: 'action',
            render: (_, record) => (
                <span>
                    {/* Засах дүрс */}
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    {/* Устгах дүрс */}
                    <Popconfirm
                        title="Та энэ мөрийг устгахдаа итгэлтэй байна уу?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={() => message.info('Устгах үйлдлийг цуцаллаа.')}
                        okText="Тийм"
                        cancelText="Үгүй"
                    >
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </span>
            ),
        },
    ];



    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/station`);
            setStations(response.data.data);
            setFilteredStations(response.data.data);
        } catch (error) {
            console.error('Error fetching stations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        const filteredData = stations.filter((station) =>
            ['name', 'zone_name', 'id', 'capacity'].some((key) =>
                String(station[key] || '').toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredStations(filteredData);
    };

    const handleAddStation = async (values) => {
        try {
            if (editingStation) {
                await axios.put(`${import.meta.env.VITE_API_URL}/station/${editingStation.id}`, values);
                message.success('Амжилттай засагдлаа!');
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/station`, values);
                message.success('Амжилттай station үүслээ!');
            }
            setIsModalVisible(false);
            setEditingStation(null);
            fetchStations();
        } catch (error) {
            console.error('Error adding station:', error);
            message.error('Алдаа гарлаа! Дахин оролдоно уу.');
        }
    };

    const handleTableChange = (pagination) => {
        setTableParams({
            pagination,
        });
    };

    return (
        <Card title="Станцын мэдээлэл" className="p-0">
            <div className='flex justify-between'>
                <Search
                    placeholder="Хайх текстээ оруулна уу"
                    className='mb-2 w-[25%]'
                    allowClear
                    enterButton="Хайх"
                    size="middle"
                    onSearch={handleSearch}
                />
                <Button
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                    className="mb-2 bg-green-400"
                >
                    Станц нэмэх
                </Button>
            </div>

            <Modal
                title={editingStation ? "Станц засах" : "Станц нэмэх"}
                open={isModalVisible}
                onCancel={() => { setIsModalVisible(false); setEditingStation(null); }}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleAddStation}
                    initialValues={editingStation ? {
                        name: editingStation.name,
                        phone_number: editingStation.phone_number,
                        zone_number: editingStation.zone_number,
                        zone_name: editingStation.zone_name,
                        capacity: editingStation.capacity
                    } : {}}
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
                        label="БҮСИЙН ДУГААР"
                        name="zone_number"
                        rules={[{ required: true, message: 'Бүсийн дугаараа оруулна уу!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="БҮСИЙН НЭР"
                        name="zone_name"
                        rules={[{ required: true, message: 'Бүсийн нэрээ оруулна уу!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="БАГТААМЖ"
                        name="capacity"
                        rules={[{ required: true, message: 'Багтаамжаа оруулна уу!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="bg-green-400">
                            {editingStation ? "Засах" : "Нэмэх"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <Table
                columns={columns}
                dataSource={filteredStations}
                pagination={{
                    ...tableParams.pagination,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '50'],
                    showQuickJumper: false,
                    locale: {
                        items_per_page: 'хуудас',
                    },
                }}
                size="small" // Мөр хоорондын зай багасгах
                loading={loading}
                rowKey="id"
                onChange={handleTableChange}
            />
        </Card>
    );
};

export default Stations;

