// import { Button, DatePicker, Form, Input, Modal, notification } from "antd";
// import CreateCall from "../functions/createCall";

// export default function AddCallModal({ open, close, refresh }) {


//     const saveAndClose = async (values) => {
//         console.log(values)
//         if (values.phone1 === values.phone2) return notification.error({ message: "Өөрлүүгээ дуудлага хийсэн? 😟" })
//         const postData = {
//             phone1: values.phone1,
//             phone2: values.phone2,
//             start: values.duration,
//             end: values.duration2
//         }
//         const response = await CreateCall(postData)
//         if (response) {
//             notification.success({ message: "Амжилттай бүртгэгдлээ" })
//             refresh()
//         }
//         close()

//     }
//     return < Modal
//         title="Дуудлага гараас бүртгэх хэсэг"
//         visible={open}
//         onCancel={close}
//         footer={null}
//     >
//         <Form
//             layout="vertical"
//             onFinish={saveAndClose}
//         >
//             <Form.Item
//                 label="Дуудлага хийсэн"
//                 name="phone1"
//                 rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item
//                 label="Дуудлага хүлээн авсан"
//                 name="phone2"
//                 rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item
//                 label="Дуудлага эхэлсэн хугацаа"
//                 name="duration"
//                 rules={[{ required: true, message: 'Хугацаа сонгох хэсэг!' }]}
//             >
//                 <DatePicker showTime />
//             </Form.Item>
//             <Form.Item
//                 label="Дуудлага дууссан хугацаа"
//                 name="duration2"
//                 rules={[{ required: true, message: 'Хугацаа сонгох хэсэг!' }]}
//             >
//                 <DatePicker showTime />
//             </Form.Item>
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Бүртгэх
//                 </Button>
//             </Form.Item>
//         </Form>
//     </Modal>
// }


import { Button, DatePicker, Form, Input, Modal, notification } from "antd";
import CreateCall from "../functions/createCall";
import dayjs from "dayjs"; // Import dayjs for date formatting

export default function AddCallModal({ open, close, refresh }) {

    const saveAndClose = async (values) => {
        console.log(values);

        // Check if the caller and called numbers are the same
        if (values.caller === values.called) {
            return notification.error({ message: "Өөрлүүгээ дуудлага хийсэн? 😟" });
        }

        // Prepare the data to be sent to the API
        const postData = {
            caller: values.caller,
            called: values.called,
            duration: values.duration, // Assuming duration is in seconds
            duration_start: values.duration_start.format('YYYY-MM-DD HH:mm:ss'),
            duration_end: values.duration_end.format('YYYY-MM-DD HH:mm:ss'),
            incomingTrunk: values.incomingTrunk,
            outgoingTrunk: values.outgoingTrunk,
            linkNumber: values.linkNumber,
            bearerServices: values.bearerServices,
        };

        // Call the API to create the call record
        const response = await CreateCall(postData);

        if (response) {
            notification.success({ message: "Амжилттай бүртгэгдлээ" });
            refresh(); // Refresh the table or list to show the new record
        }

        close(); // Close the modal
    };

    return (
        <Modal
            title="Дуудлага гараас бүртгэх хэсэг"
            visible={open}
            onCancel={close}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={saveAndClose}
            >
                <Form.Item
                    label="Дуудлага хийсэн"
                    name="caller"
                    rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Дуудлага хүлээн авсан"
                    name="called"
                    rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Дуудлагын хугацаа (сек)"
                    name="duration"
                    rules={[{ required: true, message: 'Хугацаа оруулна уу!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Эхэлсэн хугацаа"
                    name="duration_start"
                    rules={[{ required: true, message: 'Хугацаа сонгох хэсэг!' }]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    label="Дууссан хугацаа"
                    name="duration_end"
                    rules={[{ required: true, message: 'Хугацаа сонгох хэсэг!' }]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    label="Орсон транк"
                    name="incomingTrunk"
                    rules={[{ required: true, message: 'Орсон транк оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Гарсан транк"
                    name="outgoingTrunk"
                    rules={[{ required: true, message: 'Гарсан транк оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Холбогдох дугаар"
                    name="linkNumber"
                    rules={[{ required: true, message: 'Холбогдох дугаар оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Үйлчилгээг хангах"
                    name="bearerServices"
                    rules={[{ required: true, message: 'Үйлчилгээг хангах оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Бүртгэх
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}