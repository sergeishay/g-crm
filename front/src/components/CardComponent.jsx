import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import ClientStoreContext from '../Stores/Client/ClientStore';
import { Card, Avatar, Row } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;



const CardComponent = observer((props) => {
    const ClientStore = useContext(ClientStoreContext)
    const clients = props.clients.listOfClients

    // const deleteClient = () => {
    //     props.deleteClient(client.id)
    // }
    const deleteClient = async (id)=>{
        const clientID = id
        await ClientStore.deleteClient(clientID)
        props.renderPage()
    }



    if (clients.length > 0) {
        return (

            clients.map((client, i) => {
                return (
                    <div key={i} className="cardComp">
                        <Card
                            style={{ width: 300, margin: 4 }}
                            title={client.clientName}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined name={client.clientName} value={client} onClick={()=>deleteClient(client.id)}  key="delete" />
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>


                    </div>
                )
            })

        )
    } else {
        return (
            <div>
                cant post yet
            </div>
        )
    }

})

export default CardComponent


