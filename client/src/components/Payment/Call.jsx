import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, Select, message, Upload, notification } from 'antd';
import axios from 'axios';
import { FileTextOutlined, PhoneOutlined } from '@ant-design/icons';
import AddCallModal from '../modal/addCall';

const Call = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCall, setAddCall] = useState(false);
  const [importCall, setImportCall] = useState(false);
  const [fileList, setFileList] = useState([]);

  const columns = [
    {
      title: 'Хэлтэс',
      dataIndex: 'division',
      key: 'division',
    },
    {
      title: 'Хэнээс',
      dataIndex: 'phone1',
      key: 'phone1',
    },
    {
      title: 'Хэнд',
      dataIndex: 'phone2',
      key: 'phone2',
    },
    {
      title: 'Хугацаа',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Тариф',
      dataIndex: 'tariff',
      key: 'tariff',
    },
    {
      title: 'Дүн',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  useEffect(() => {
    getCalls();
  }, []);
  const getCalls = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/call`);
      setCalls(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };
  const closeAddCall = () => { setAddCall(false) }
  const showAddCall = () => { setAddCall(true) }
  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = async () => {
      // Get file content
      const fileContent = reader.result;

      // Split content by new lines (\n) and filter out empty lines
      const lineArray = fileContent.split(/\r?\n/).filter(Boolean);

      // Update the state with the extracted lines
      console.log(lineArray);
      const data = lineArray.map(line => {
        const words = line.replaceAll('  ', ' ').split(" ")
        var obj = {
          phone1: words[0],
          phone2: words[1],
          duration: words[2],
          tariff: words[3],
          amount: words[4]
        }
        return obj
      })
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/call/bulk`, data)
      if (response) {
        notification.success({ message: "Амжилттай бүртгэгдлээ" })
        getCalls();
      }
      message.success(`${file.name} амжилттаи татлаа!`);
    };

    reader.onerror = () => {
      message.error("Error reading the file");
    };

    // Read the file as text
    reader.readAsText(file);

    // Return false to prevent the default behavior of the Upload component (uploading the file itself)
    return false;
  };
  return (
    <Card title="Дуудлагын мэдээлэл">
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', flexDirection: 'row' }}>
        <Button
          type="primary"
          onClick={showAddCall}
          icon={<PhoneOutlined />}
        >
          Дуудлага бүртгэх
        </Button>
        <Upload
          customRequest={({ file }) => handleFileUpload(file)} // Use customRequest to prevent immediate upload
          showUploadList={false} // Hide the default upload list
          accept='.txt' // Only accept .txt files
        >
          <Button
            type="primary"
            onClick={() => { }}
            icon={<FileTextOutlined />}
          >
            Файл-с бүртгэх
          </Button>
        </Upload>

      </div>
      <Table
        columns={columns}
        dataSource={calls}
        loading={loading}
        rowKey="id"
      />
      {addCall && <AddCallModal open={addCall} close={closeAddCall} refresh={fetchPayments} />}
    </Card>
  );
};

export default Call;