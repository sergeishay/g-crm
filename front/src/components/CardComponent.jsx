import '../styles/CardComponent.css'
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
    const [updateClient, setUpdateClient] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);

 

    ///////////delete client
    const deleteClient = async (id) => {
        const clientID = id
        console.log(clientID)
        await ClientStore.deleteClient(clientID)
        props.renderPage()
    }
//////////////open modal
    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }
//////////////close modal
    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }


/////////////update client   
    const getAndupdateClient = (id) => {
        console.log(id)
        let thisClient = ClientStore.listOfClients.filter(client => client._id === id)
        console.log(thisClient)
        setUpdateClient(thisClient)
    }




    const getBrendsByClientId = (clickClient) => {
        console.log(clickClient)
        BrendsStore.correntClient = [clickClient]
        // BrendsStore.getAllBrendsByClientID(clickClient.id)
        console.log(BrendsStore.correntClient)
    }


    useEffect(() => {
        Modal.setAppElement('body')
    }, [])



    if (listOfClients.length> 0) {


        return (
            <>
                <Modal isOpen={modalIsOpen} >
                    <button onClick={setModalIsOpenToFalse}>x</button>
                    <UpdateModal renderPage={props.renderPage} newClient={false} edit={true} updateClient={updateClient} setModalIsOpenToFalse={setModalIsOpenToFalse} />
                </Modal>
                {listOfClients && listOfClients.map((client, i) => {
                    return (

                        <div key={i} className="cardComp">
                            <Card
                                onClick={(() => { getBrendsByClientId(client) })}
                                style={{
                                     width: 300,
                                      margin: 4,
                                      backgroundColor:"rgb(255, 228, 203)",
                                      
                                     }}
                                title={<Link style={{ color: 'black', underline: 'none' }} to={`/clients/${client.clientName}`}>{client.clientName}</Link>}
                                cover={<Link to={`/clients/${client.clientName}`}><img
                                    style={{ width: '100%' }}
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                /></Link>}
                                actions={[
                                    <EditOutlined onClick={() => { { getAndupdateClient(client._id) }; setModalIsOpenToTrue() }} key="edit" />,
                                    <DeleteOutlined name={client.clientName} value={client} onClick={() => { deleteClient(client._id) }} key="delete" />
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

    }else{
        return( <div>
            cant post yet
        </div>)
    }
})

export default CardComponent


