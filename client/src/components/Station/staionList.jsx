import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';

const { Search } = Input;

const Stations = () => {
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStation, setEditingStation] = useState(null);

    const columns = [
        { title: 'Нэр', dataIndex: 'name', key: 'name' },
        { title: 'Утасны дугаар', dataIndex: 'phone_number', key: 'phone_number' },
        { title: '№', dataIndex: 'station_number', key: 'station_number' },
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'БҮСИЙН ДУГААР', dataIndex: 'zone_number', key: 'zone_number' },
        { title: 'БҮСИЙН НЭР', dataIndex: 'zone_name', key: 'zone_name' },
        { title: 'СТАНЦЫН НЭР', dataIndex: 'station_name', key: 'station_name' },
        { title: 'ДУГААРЛАЛТ', dataIndex: 'labeling', key: 'labeling' },
        { title: 'ТРАНК(ХОЛБОХ ШУГАМУУД)', dataIndex: 'trunk_lines', key: 'trunk_lines' },
        { title: 'БАГТААМЖ', dataIndex: 'capacity', key: 'capacity' },
    ];

    useEffect(() => {
        fetchStation();
    }, []);

    const fetchStation = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/stations`);
            setStations(response.data);
            setFilteredStations(response.data);
        } catch (error) {
            console.error('Error fetching station:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        const filteredData = stations.filter((station) =>
            ['name', 'phone_number', 'id'].some((key) =>
                String(station[key]).toLowerCase().includes(value.toLowerCase())
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
            fetchStation();
        } catch (error) {
            console.error('Error adding station:', error);
            message.error('Алдаа гарлаа! Дахин оролдоно уу.');
        }
    };


    return (
        <Card title="Станцын мэдээлэл">
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
                    Станц нэмэх
                </Button>
            </div>

            <Modal
                title={editingStation ? "Станц засах" : "Станц нэмэх"}
                visible={isModalVisible}
                onCancel={() => { setIsModalVisible(false); setEditingStation(null); }}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleAddStation}
                    initialValues={editingStation || {}}
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
                loading={loading}
                rowKey="id"
            />
        </Card>
    );
};

export default Stations;
