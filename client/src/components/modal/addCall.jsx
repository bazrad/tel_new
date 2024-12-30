import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd";
import CreateCall from "../functions/createCall";




export default function AddCallModal({open,close,refresh}){


    const saveAndClose = async (values) => {
        console.log(values)
        if(values.phone1 === values.phone2) return notification.error({message:"Өөрлүүгээ дуудлага хиисэн? 😟"})
        const postData={
            phone1:values.phone1,
            phone2:values.phone2,
            duration:values.duration
        }
        const response=await CreateCall(postData)
        if(response)
        {
            notification.success({message:"Амжилттай бүртгэгдлээ"})
            refresh()
        }
        close()
       
    }
    return  < Modal
                title="Дуудлага бүртгэх"
                visible={open}
                onCancel={close}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={saveAndClose}
                >
                <Form.Item
                    label="Хаанаас"
                    name="phone1"
                    rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Хаашаа"
                    name="phone2"
                    rules={[{ required: true, message: 'Дугаараа оруулна уу!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Хугацаа(сек)"
                    name="duration"
                    rules={[{ required: true, message: 'Хугацаа сонгох хэсэг!' }]}
                >
                    <InputNumber min={0}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Бүртгэх
                    </Button>
                </Form.Item>
                </Form>
        </Modal>
}