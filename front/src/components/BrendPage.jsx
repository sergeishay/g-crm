
import '../styles/CllientsPage.css'
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import axios from '../../node_modules/axios';
import { Tooltip, Button, Row } from 'antd';
import ClientsModal from './Modals/ClientModal'
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import CardComponent from './CardComponent'
import Modal from 'react-modal'
import { observer } from 'mobx-react-lite'
import BrendsStoreContext from '../Stores/Brend/BrendStore';


export const BrendPage = observer((props) => {

    const BrendStore = useContext(BrendsStoreContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const mr = props.match.params
    console.log(mr)
    const thisClient = props
    console.log(thisClient)




    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const renderPage = () =>{
        BrendStore.getAllClients()
    }

    useEffect(() => {
        Modal.setAppElement('body')
    }, [BrendStore.listOfClients])

    console.log(BrendStore.listOfBrendsforClient)
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




            <div className="BrendPageCard">
                <Row gutter={[16, 16]}>
                    <React.Fragment>

                    </React.Fragment>
                </Row>
            </div>
        </div>
    )
})

export default BrendPage