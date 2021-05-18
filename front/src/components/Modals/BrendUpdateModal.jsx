import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { SmileOutlined, } from '@ant-design/icons';
import { Form, Input, Button, Radio } from 'antd';
import { useInput } from './input-hook'
import ClientStoreContext from '../../Stores/Client/ClientStore';
import BrendsStoreContext from '../../Stores/Brend/BrendStore';
import { observer } from 'mobx-react-lite'
import './modal.css'


const UpdateModal = observer((props) => {


    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const BrendStore = useContext(BrendsStoreContext)
    const ClientStore = useContext(ClientStoreContext)

    const [UpdateLink, setUpdateLink] = useState(props.updateClientBrend[0].brendLink)
    const [UpdateName, setUpdateName] = useState(props.updateClientBrend[0].brendName)
    const [UpdateClientBrendId, setUpdateClientBrendId] = useState(props.updateClientBrend[0].clientBrendId)
    const [UpdateIndestry, setUpdateIndestry] = useState(props.updateClientBrend[0].indestry)
    const [UpdatedollarCo, setUpdatedollarCo] = useState(props.updateClientBrend[0].dollarCo)
    const [UpdatePricing, setUpdatePricing] = useState(props.updateClientBrend[0].pricing)
    const [UpdateOwner, setUpdateOwner] = useState(props.updateClientBrend[0].owner)
    const [UpdatePaymehod, setUpdatePaymehod] = useState(props.updateClientBrend[0].paymehod)
    

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
    const handleClientBrendId = (e) => {
        const ClientBrendId = e.target.value
        console.log(ClientBrendId)
        setUpdateClientBrendId(ClientBrendId)
    }
    const handleIndestry = (e) => {
        const Indestry = e.target.value
        console.log(Indestry)
        setUpdateIndestry(Indestry)
    }   
    const handledollarCo = (e) => {
        const dollarCo = e.target.value
        console.log(dollarCo)
        setUpdatedollarCo(dollarCo)
    }
    const handlePricing = (e) => {
        const Pricing = e.target.value
        console.log(Pricing)
        setUpdatePricing(Pricing)
    }
    const handleOwner = (e) => {
        const Owner = e.target.value
        console.log(Owner)
        setUpdateOwner(Owner)
    }
    const handlePaymehod = (e) => {
        const Paymehod = e.target.value
        console.log(Paymehod)
        setUpdatePaymehod(Paymehod)
    }

    const handleSubmitUpdate = async (evt) => {
        evt.preventDefault();
        const brendData = {
            post: [],
            brendName: UpdateName,
            brendLink: UpdateLink,
            indestry: UpdateIndestry,
            dollarCo: UpdatedollarCo,
            pricing: UpdatePricing,
            owner: UpdateOwner,
            paymehod: UpdatePaymehod,
            clientBrendId: props.updateClientBrend[0].clientBrendId || null
        }
        // console.log(props.updateClientBrend[0].clientBrendId)
        // console.log(props.updateClientBrend[0]._id)
        // console.log(brendData)
        await BrendStore.updateBrandByClientId(props.updateClientBrend[0].clientBrendId,props.updateClientBrend[0]._id,brendData)
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
                <Form.Item label="Brend Name">
                    <Input placeholder="Brend Name" name="name" value={UpdateName} onChange={handleName} />
                </Form.Item>
                <Form.Item label="brend Website">
                    <Input placeholder="brend Website" onKeyPress={handleKeypress} name="link" value={UpdateLink} onChange={handleLink} />
                </Form.Item>
                <Form.Item label="Indestry">
                    <Input placeholder="Indestry" onKeyPress={handleKeypress} name="Indestry" value={UpdateIndestry} onChange={handleIndestry} />
                </Form.Item>
                <Form.Item label="dollarCo">
                    <Input placeholder="dollarCo" onKeyPress={handleKeypress} name="dollarCo" value={UpdatedollarCo} onChange={handledollarCo} />
                </Form.Item>
                <Form.Item label="Pricing">
                    <Input placeholder="Pricing" onKeyPress={handleKeypress} name="Pricing" value={UpdatePricing} onChange={handlePricing} />
                </Form.Item>
                <Form.Item label="Owner">
                    <Input placeholder="Owner" onKeyPress={handleKeypress} name="Owner" value={UpdateOwner} onChange={handleOwner} />
                </Form.Item>
                <Form.Item label="Paymehod">
                    <Input placeholder="Paymehod" onKeyPress={handleKeypress} name="Paymehod" value={UpdatePaymehod} onChange={handlePaymehod} />
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button onClick={handleSubmitUpdate} onKeyPress={handleKeypress} type="primary">Update Brend</Button>
                </Form.Item>
            </Form>
        </div>
    )
})

export default UpdateModal


