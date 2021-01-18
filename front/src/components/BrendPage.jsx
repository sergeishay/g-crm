
import '../styles/CllientsPage.css'
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import axios from '../../node_modules/axios';
import { Tooltip, Button, Row } from 'antd';
import ClientsModal from './Modals/ClientModal'
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import CardComponent from './CardComponent'
import Modal from 'react-modal'
import { observer } from 'mobx-react-lite'
import ClientStoreContext from '../Stores/Client/ClientStore';


export const BrendPage = observer((props) => {

    const ClientStore = useContext(ClientStoreContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const renderPage = () =>{
        ClientStore.getAllClients()
    }

    useEffect(() => {
        Modal.setAppElement('body')
    }, [ClientStore.listOfClients])

    console.log(ClientStore.listOfClients)
    return (
        <div className='clientsPageBody' >
            <div className='addClientDiv'>
                <Tooltip placement="topLeft" title='add new client'>
                    <Button
                        className='btnModal'
                        onClick={setModalIsOpenToTrue}
                        size='large'
                        icon={<PlusOutlined />}
                    ></Button>
                </Tooltip>
                <Modal isOpen={modalIsOpen} >
                    <button onClick={setModalIsOpenToFalse}>x</button>
                    <ClientsModal newClient={true} edit={false} renderPage={renderPage} setModalIsOpenToFalse={setModalIsOpenToFalse} />
                </Modal>
            </div>




            <div className="clientsPageCard">
                <Row gutter={[16, 16]}>
                    <React.Fragment>
                        <CardComponent
                            clients={ClientStore}
                            renderPage={renderPage}
                        />
                    </React.Fragment>
                </Row>
            </div>
        </div>
    )
})

export default BrendPage