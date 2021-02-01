import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import ClientStoreContext from '../Stores/Client/ClientStore';
import BrendsStoreContext from '../Stores/Brend/BrendStore';
import { Card, Avatar, Row, Skeleton, Switch } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import UpdateModal from './Modals/UpdateModal';
import Modal from 'react-modal';
const { Meta } = Card;



const BrendsCardComponent = observer((props) => {
    const BrendsStore = useContext(BrendsStoreContext)
    const  listOfBrends = BrendsStore.listOfBrendsforClient
    const propsOfBrends = props.brends
    console.log(propsOfBrends)
    console.log(listOfBrends)
    const [updateClient, setUpdateClient] = useState([])
    const [loading , setLoading] = useState(true)

    const deleteClient = async (id) => {
        // const clientID = id
        // await ClientStore.deleteClient(clientID)
        // props.renderPage()
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }
    const getAndupdateClient = (id) => {
        // let thisClient = ClientStore.listOfClients.filter(client => client.id === id)
        // setUpdateClient(thisClient)
    }
    useEffect(() => {
        Modal.setAppElement('body')
    }, [])
    if (listOfBrends.length > 0) {
        return (
            <>
                <Modal isOpen={modalIsOpen} >
                    <button onClick={setModalIsOpenToFalse}>x</button>
                    <UpdateModal renderPage={props.renderPage} setModalIsOpenToFalse={setModalIsOpenToFalse} />
                </Modal>
                {listOfBrends.map((brend, i) => {
                    return (
                        <div key={i} className="cardComp">
                            <Card
                                style={{ width: 300, margin: 4 }}
                                title={brend.brendName}
                                cover={<img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />}
                                actions={[
                                    <EditOutlined onClick={() => { { getAndupdateClient(brend.id) }; setModalIsOpenToTrue() }} key="edit" />,
                                    <DeleteOutlined onClick={() => { deleteClient(brend.id) }} key="delete" />
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
                <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                    <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            </div>
        )
    }

})

export default BrendsCardComponent


