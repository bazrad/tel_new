import { Button, DatePicker, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import CreateCall from "../functions/createCall";




export default function AddCallModal({ open, close, refresh }) {


    const saveAndClose = async (values) => {
        console.log(values)
        if (values.phone1 === values.phone2) return notification.error({ message: "Өөрлүүгээ дуудлага хийсэн? 😟" })
        const postData = {
            phone1: values.phone1,
            phone2: values.phone2,
            start: values.duration,
            end: values.duration2
        }
        const response = await CreateCall(postData)
        if (response) {
            notification.success({ message: "Амжилттай бүртгэгдлээ" })
            refresh()
        }
        close()

    }
    return < Modal
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
                name="phone1"
                rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Дуудлага хүлээн авсан"
                name="phone2"
                rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Дуудлага эхэлсэн хугацаа"
                name="duration"
                rules={[{ required: true, message: 'Хугацаа сонгох хэсэг!' }]}
            >
                <DatePicker showTime />
            </Form.Item>
            <Form.Item
                label="Дуудлага дууссан хугацаа"
                name="duration2"
                rules={[{ required: true, message: 'Хугацаа сонгох хэсэг!' }]}
            >
                <DatePicker showTime />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="bg-green-400">
                    Бүртгэх
                </Button>
            </Form.Item>
        </Form>
    </Modal>
}