
import '../styles/CllientsPage.css'
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import axios from '../../node_modules/axios';
import { Tooltip, Button, Row } from 'antd';
import ClientsModal from './Modals/ClientModal'
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import CardComponent from './CardComponent'
import BrendsCardComponent from './BrendsCardComponent'
import Modal from 'react-modal'
import { observer } from 'mobx-react-lite'
import BrendsStoreContext from '../Stores/Brend/BrendStore';
import ClientStoreContext from '../Stores/Client/ClientStore';
import BrendModal from './Modals/BrendModal'
import {useHistory} from "react-router-dom";

export const BrendPage = observer((props) => {

    const BrendStore = useContext(BrendsStoreContext)
    const ClientStore = useContext(ClientStoreContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();

    const clientsBrendsById = BrendStore.correntClient
    console.log(clientsBrendsById)



    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const renderPage = () => {
        BrendStore.getAllBrendsByClientID()
    }




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
                    <BrendModal newClient={true} edit={false} renderPage={renderPage} setModalIsOpenToFalse={setModalIsOpenToFalse} />
                </Modal>
            </div>



            <div className="clientsPageCard">
                <Row gutter={[16, 16]}>
                    <React.Fragment>
                        <BrendsCardComponent
                            match={props.match}
                            brends = {BrendStore}
                            renderPage={renderPage}
                        />
                    </React.Fragment>
                </Row>
            </div>
            <div className="backToHomePage">
                          <button className="back" onClick={() => history.goBack()}>Back to All Clients</button>
                </div>
        </div>
    )
})

export default BrendPage