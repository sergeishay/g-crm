
import '../styles/CllientsPage.css'
import React, { Link ,useState, useEffect, useContext, useLayoutEffect } from 'react'
import axios from '../../node_modules/axios';
import { Tooltip, Button, Row } from 'antd';
import ClientsModal from './Modals/ClientModal'
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import CardComponent from './CardComponent'
import Modal from 'react-modal'
import { observer } from 'mobx-react-lite'
import ClientStoreContext from '../Stores/Client/ClientStore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FadeIn from "react-fade-in";
import {useHistory} from "react-router-dom";


export const ClientsPage = observer((props) => {
//observe changes and setStates
    const ClientStore = useContext(ClientStoreContext)
    const [clients, setClients] = useState([])
    const [number, setNumber] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();

//open and close modal
    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }
    console.log("here")
//render the clients from the database
    const renderPage = () => {
        ClientStore.getAllClients()
    }

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
                                match={props.match}
                                clients={ClientStore}
                                renderPage={renderPage}
                            />
                        </React.Fragment>
                    </Row>
                </div>

                <div className="backToHomePage">
               
                    <button className="back" onClick={() => history.goBack()}>Back Home</button>
              
                </div>
        </div>
    )
})

export default ClientsPage