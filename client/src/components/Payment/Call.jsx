import React, { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Form, Input, Select, message, Upload, notification } from 'antd';
import axios from 'axios';
import { FileTextOutlined, PhoneOutlined, CalculatorOutlined } from '@ant-design/icons';
import AddCallModal from '../modal/addCall';
import dayjs from 'dayjs';
import currencyFormat from '@/helpers/currencyFormat';

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
    {
      title: 'Тариф',
      dataIndex: 'tariffName',
      key: 'tariffName',
    },
    {
      title: 'Дүн',
      dataIndex: 'amount',
      key: 'amount',
    },

  ];
  1


  const tariff = [
    { id: 1, name: 'УБТЗ төлбөргүй', tarif_type_id: 1, root: 0, l1: 0, secondTime: 60, l2: 0, l3: 0, llast: 0, calltype_id: 1, },
    { id: 2, name: 'УБТЗ хот дотор', tarif_type_id: 2, root: 10, l1: 10, secondTime: 60, l2: 0, l3: 0, llast: 0, calltype_id: 2 },
    { id: 3, name: 'УБТЗ хот хооронд', tarif_type_id: 3, root: 20, l1: 20, secondTime: 6, l2: 0, l3: 0, llast: 0, calltype_id: 3 },
    { id: 4, name: 'УБТЗ гадаад', tarif_type_id: 4, root: 30, l1: 3, secondTime: 6, l2: 0, l3: 0, llast: 0, calltype_id: 4 },
    { id: 5, name: 'УБТЗ -р дамжин МЦХ ХК руу', tarif_type_id: 5, root: 60, l1: 6, secondTime: 60, l2: 0, l3: 0, llast: 0, calltype_id: 5 },
  ];


  useEffect(() => {
    getCalls();
  }, []);
  const getCalls = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/call`);
      console.log(response)
      //Math.floor(Math.random() * 4);

      setCalls(response.data.data.map(call => {
        const tariffNum = Math.floor(Math.random() * 5);
        // console.log(tariffNum);
        return { ...call, tariff: tariff[tariffNum], tariffName: tariff[tariffNum].name }
      }));
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(calls);
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
        notification.success({ message: "Амжилттай бүртгэгдлээ" });
        console.log(`calls`, calls);
        getCalls();

      }
      message.success(`${file.name} амжилттай татлаа!`);
    };
    console.log(`calls`, calls);
    reader.onerror = () => {
      message.error("Error reading the file");
    };
    // Read the file as text
    reader.readAsText(file);
    // Return false to prevent the default behavior of the Upload component (uploading the file itself)
    return false;
  };

  const calculateTariff = () => {
    const ika = calls.map(call => {
      var diff = Math.abs(dayjs(call.duration_end).diff(dayjs(call.duration_start), 'second'));
      var cost = 0;
      if (diff > 5 && diff < 60) {
        cost = call.tariff.root;
      } else if (diff > 60) {
        if (call.secondTime === 60) {
          diff -= 60;
          cost = call.tariff.root + (diff / 60) * call.tariff.l1;
        }
        else {
          diff -= 60;
          cost = call.tariff.root + (diff / 6) * call.tariff.l1;
        }
      }
      return { ...call, amount: currencyFormat(cost) }
    })
    setCalls(ika);
  }

  return (
    <Card title="Дуудлагын мэдээллүүд">
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', flexDirection: 'row', marginBottom: '10px' }}>
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

        <Button
          className="bg-green-400"
          type="primary"
          onClick={() => calculateTariff()}
          icon={<CalculatorOutlined />
          }
          style={{ marginLeft: 'auto' }} // Add margin-left:auto to push the button to the end of the container
        >
          Бодолт хийх
        </Button>
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