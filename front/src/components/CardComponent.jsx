import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import ClientStoreContext from '../Stores/Client/ClientStore';
import BrendStoreContext from '../Stores/Brend/BrendStore';
import { Card, Avatar, Row } from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import UpdateModal from './Modals/UpdateModal';
import Modal from 'react-modal';
import BrendPage from './BrendPage'
const { Meta } = Card;



const CardComponent = observer((props) => {
    const ClientStore = useContext(ClientStoreContext)
    const BrendsStore = useContext(BrendStoreContext)
    const listOfClients = ClientStore.listOfClients
    const clients = props.clients.listOfClients
    const [updateClient, setUpdateClient] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);

    console.log(listOfClients)

    const deleteClient = async (id) => {
        const clientID = id
        await ClientStore.deleteClient(clientID)
        props.renderPage()
    }

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }
    const getAndupdateClient = (id) => {
        let thisClient = ClientStore.listOfClients.filter(client => client.id === id)
        setUpdateClient(thisClient)
    }

    const getBrendsByClientId = (clickClient) => {
        console.log(clickClient)
        BrendsStore.correntClient = [clickClient]
        // BrendsStore.getAllBrendsByClientID(clickClient.id)
        console.log(BrendsStore.correntClient)
    }






    if (clients.length > 0) {

        return (
            <>
                <Modal isOpen={modalIsOpen} >
                    <button onClick={setModalIsOpenToFalse}>x</button>
                    <UpdateModal renderPage={props.renderPage} newClient={false} edit={true} updateClient={updateClient} setModalIsOpenToFalse={setModalIsOpenToFalse} />
                </Modal>
                {listOfClients.map((client, i) => {
                    return (

                        <div key={i} className="cardComp">
                            <Card
                                onClick={(() => { getBrendsByClientId(client) })}
                                style={{ width: 300, margin: 4 }}
                                title={<Link style={{ color: 'black', underline: 'none' }} to={`/clients/${client.clientName}`}>{client.clientName}</Link>}
                                cover={<Link to={`/clients/${client.clientName}`}><img

                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                /></Link>}
                                actions={[
                                    <EditOutlined onClick={() => { { getAndupdateClient(client.id) }; setModalIsOpenToTrue() }} key="edit" />,
                                    <DeleteOutlined name={client.clientName} value={client} onClick={() => { deleteClient(client.id) }} key="delete" />
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

                }
                )}
            </>
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


