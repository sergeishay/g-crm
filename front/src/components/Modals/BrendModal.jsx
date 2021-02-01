import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { SmileOutlined, } from '@ant-design/icons';
import { Form, Input, Button, Radio } from 'antd';
import { useInput } from './input-hook'
import BrendsStoreContext from '../../Stores/Brend/BrendStore';
import { observer } from 'mobx-react-lite'

const initialValues = {
    brendName : "",
    indestry: "",
    brendLink:"",
    dollarCo: "",
    pricing: "",
    owner: "",
    paymehod: "",
    posts:[]
  };

const BrendModal = observer((props) => {
    const BrendsStore = useContext(BrendsStoreContext)
    const clientBrends = BrendsStore.correntClient[0]
    console.log(clientBrends)
    const clientId = clientBrends._id
    const [values, setValues] = useState(initialValues);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };



    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const helder = {
            brendName : values.brendName,
            indestry: values.indestry,
            brendLink:values.brendLink,
            dollarCo: values.dollarCo,
            pricing: values.pricing,
            owner: values.owner,
            paymehod: values.paymehod,
            posts:[]
        }
        await BrendsStore.creatNewBrend(clientId,helder);
        props.setModalIsOpenToFalse();
    }
    
    
    
    ////////form layout
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const formItemLayout =
        formLayout === 'horizontal'? {
                labelCol: {span: 4,},
                wrapperCol: {span: 14,},
            }: null;
    const buttonItemLayout =
        formLayout === 'horizontal'? {
                wrapperCol: { span: 14, offset: 9, }, }: null;






    return (
        <div className="Brend-new-modal">
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{
                        layout: formLayout,
                    }}
                    onValuesChange={onFormLayoutChange}
                >
                    <Form.Item label="Brand Name">
                        <Input placeholder="Brand Name" value={values.brendName} onChange={handleInputChange} name="brendName"/>
                    </Form.Item>
                    <Form.Item label="Indestry">
                        <Input placeholder="Indestry" value={values.indestry} onChange={handleInputChange} name="indestry"/>
                    </Form.Item>
                    <Form.Item label="Brand Web Site">
                        <Input placeholder="Brand Web Site" value={values.brendLink} onChange={handleInputChange} name="brendLink" />
                    </Form.Item>
                    <Form.Item label="Dollar">
                        <Input placeholder="Dollar" value={values.dollarCo} onChange={handleInputChange} name="dollarCo" />
                    </Form.Item>
                    <Form.Item label="Pricing">
                        <Input placeholder="Pricing" value={values.pricing} onChange={handleInputChange} name="pricing" />
                    </Form.Item>
                    <Form.Item label="Brand workers">
                        <Input placeholder="Brand workers" value={values.owner} onChange={handleInputChange} name="owner" />
                    </Form.Item>
                    <Form.Item label="Paymehod">
                        <Input placeholder="Paymehod" value={values.paymehod} onChange={handleInputChange} name="paymehod"/>
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button onClick={handleSubmit} type="primary">Create The Brend</Button>
                    </Form.Item>
                </Form>
        </div>
    )
})

export default BrendModal


