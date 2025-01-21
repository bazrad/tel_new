import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, Select, message, Upload, notification } from 'antd';
import axios from 'axios';
import { FileTextOutlined, PhoneOutlined } from '@ant-design/icons';
import AddCallModal from '../modal/addCall';
import dayjs from 'dayjs';

const Call = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCall, setAddCall] = useState(false);
  const [importCall, setImportCall] = useState(false);
  const [fileList, setFileList] = useState([]);

  const columns = [
    {
      title: 'Дуудлага хийсэн',
      dataIndex: 'number_in',
      key: 'number_in',
      render: e => e.phone_number
    },
    {
      title: 'Дуудлага хүлээн авсан',
      dataIndex: 'number_out',
      key: 'number_out',
      render: e => e.phone_number
    },
    {
      title: 'Эхэлсэн хугацаа',
      dataIndex: 'duration_start',
      key: 'duration_start',
      render: e => dayjs(e).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'Дууссан хугацаа',
      dataIndex: 'duration_end',
      key: 'duration_end',
      render: e => dayjs(e).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'Гарсан транк',
      dataIndex: 'out_trunk',
      key: 'out_trunk',
    },
    {
      title: 'Орсон транк',
      dataIndex: 'in_trunk',
      key: 'in_trunk',
    },
    // {
    //   title: 'Дүн',
    //   dataIndex: 'amount',
    //   key: 'amount',
    // },
  ];

  useEffect(() => {
    getCalls();
  }, []);
  const getCalls = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/call`);
      console.log(response)
      setCalls(response.data.data);
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
        var date1 = words[2].split('_')
        var date2 = words[3].split('_')
        var obj = {
          phone1: words[0],
          phone2: words[1],
          start: new Date(date1[0] + ' ' + date1[1]),
          end: new Date(date2[0] + ' ' + date2[1]),
        }
        return obj
      })
      var succ = 0
      for await (const call of data) {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/call`, call)
        if (res) succ++
      }

      if (succ === data.length) {
        notification.success({ message: "Амжилттай бүртгэгдлээ" })
        getCalls();
      }
      message.success(`${file.name} амжилттай татлаа!`);
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
    <Card title="Дуудлагын мэдээллүүд">
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', flexDirection: 'row' }}>
        <Button
          className="bg-green-400"
          type="primary"
          onClick={showAddCall}
          icon={<PhoneOutlined />
          }
        >
          Дуудлага бүртгэх
        </Button>
        <Upload
          customRequest={({ file }) => handleFileUpload(file)} // Use customRequest to prevent immediate upload
          showUploadList={false} // Hide the default upload list
          accept='.txt' // Only accept .txt files
        >
          <Button
            className="bg-green-400"
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
      {addCall && <AddCallModal open={addCall} close={closeAddCall} refresh={getCalls} />}
    </Card>
  );
};

export default Call;