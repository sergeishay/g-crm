
import '../styles/CllientsPage.css'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from '../../node_modules/axios';
import { Tooltip, Button, Row } from 'antd';
import ClientsModal from './Modals/ClientModal'
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import CardComponent from './CardComponent'
import Modal from 'react-modal'

export default function ClientsPage(props) {

    const [clients, setClients] = useState([])
    const [number, setNumber] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }


    useEffect(() => {
        clientData()
        Modal.setAppElement('body')
    }, [])




    const clientData = () => {
        axios.get(`http://localhost:8080/clients`)
            .then((data) => {
                console.log(data.data.allClients)
                setClients([...clients, ...data.data.allClients])
            })
            .catch((error) => {
                console.log(error)
            })
    }


    console.log("het")
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
                    <ClientsModal />
                </Modal>
            </div>
            {console.log(clients)}



            <div className="clientsPageCard">
                <Row gutter={[16, 16]}>
                    <React.Fragment key >
                        <CardComponent
                            clients={clients}
                        />
                    </React.Fragment>
                </Row>
            </div>
        </div>
    )
}

