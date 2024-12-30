import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: 'Утасны дугаар',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Дүн',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Огноо',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/payments/history`);
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <Card title="Цэнэглэлтийн түүх">
      <Table
        columns={columns}
        dataSource={payments}
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default PaymentHistory;