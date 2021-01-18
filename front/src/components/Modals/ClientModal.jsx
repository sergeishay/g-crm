import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { SmileOutlined, } from '@ant-design/icons';
import { Form, Input, Button, Radio } from 'antd';
import { useInput } from './input-hook'
import ClientStoreContext from '../../Stores/Client/ClientStore';
import { observer } from 'mobx-react-lite'



const ClientModal = observer((props) => {


    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const ClientStore = useContext(ClientStoreContext)

    const { value: ClientName, bind: bindClientName, reset: resetClientName } = useInput('');
    const { value: ClientWebsite, bind: bindClientWebsite, reset: resetClientWebsite } = useInput('');


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const clientData = {
            brends: null,
            clientName: ClientName,
            clientLink: ClientWebsite,
            urlPick: null,
        }
        await ClientStore.createClient(clientData)
        props.setModalIsOpenToFalse()
        props.renderPage()
        resetClientName();
        resetClientWebsite()


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
                        <Input placeholder="Client Name" {...bindClientName} />
                    </Form.Item>
                    <Form.Item label="Client Website">
                        <Input placeholder="Client Website" {...bindClientWebsite} />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button onClick={handleSubmit} type="primary">Create The Client</Button>
                    </Form.Item>
                </Form>
        </div>
    )
})

export default ClientModal


