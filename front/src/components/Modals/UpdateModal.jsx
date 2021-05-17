import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { SmileOutlined, } from '@ant-design/icons';
import { Form, Input, Button, Radio } from 'antd';
import { useInput } from './input-hook'
import ClientStoreContext from '../../Stores/Client/ClientStore';
import { observer } from 'mobx-react-lite'
import './modal.css'


const UpdateModal = observer((props) => {
    const initialValues = {
        name: "",
        link: "",
    };

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const ClientStore = useContext(ClientStoreContext)

    const [UpdateName, setUpdateName] = useState(props.updateClient[0].clientName)
    const [UpdateLink, setUpdateLink] = useState(props.updateClient[0].clientLink)

    const handleName = (e) => {
        const name = e.target.value
        console.log(name)
        setUpdateName(name)
    }
    const handleLink = (e) => {
        const link = e.target.value
        console.log(link)
        setUpdateLink(link)
    }

    const handleSubmitUpdate = async (evt) => {
        evt.preventDefault();
        const clientData = {
            brends: [],
            clientName: UpdateName,
            clientLink: UpdateLink,
            urlPick: null,
            id: props.updateClient[0]._id || null
        }
        await ClientStore.updateClient(clientData)
        props.setModalIsOpenToFalse()


    }

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };

    const formItemLayout =
        formLayout === 'horizontal'
            ? {
                labelCol: {
                    span: 4,
                },
                wrapperCol: {
                    span: 14,
                },
            }
            : null;
    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                    span: 14,
                    offset: 9,
                },
            }
            : null;
    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmitUpdate();
        }
    };
    return (
        <div className="ClientNewModpaForm">
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item label="Client Name">
                    <Input placeholder="Client Name" name="name" value={UpdateName} onChange={handleName} />
                </Form.Item>
                <Form.Item label="Client Website">
                    <Input placeholder="Client Website" onKeyPress={handleKeypress} name="link" value={UpdateLink} onChange={handleLink} />
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button onClick={handleSubmitUpdate} onKeyPress={handleKeypress} type="primary">Update Client</Button>
                </Form.Item>
            </Form>
        </div>
    )
})

export default UpdateModal


