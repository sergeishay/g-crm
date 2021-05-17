import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import BrendsStoreContext from '../Stores/Brend/BrendStore';
import { Card, Avatar, Row, Skeleton, Switch } from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import UpdateModal from './Modals/UpdateModal';
import Modal from 'react-modal';
const { Meta } = Card;



const BrendsCardComponent = observer((props) => {
    const BrendsStore = useContext(BrendsStoreContext)
    const clientBrends = BrendsStore.correntClient[0].brends
    console.log(clientBrends)

    const [updateClient, setUpdateClient] = useState(clientBrends)
    const [loading , setLoading] = useState(true)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const up = []
    const deleteBrend = async (id ,brendId) => {
        // const clientID = id
       const deleteBrendFromClient = await BrendsStore.deleteBrendFromClient(id , brendId)
       setUpdateClient(deleteBrendFromClient)
    }
    const getCorrentBrends =()=> {
       return BrendsStore.correntClient[0].brends
    }

    console.log(up)
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
    }, [clientBrends,updateClient])



    if (clientBrends.length > 0) {
        return (
            <>
                <Modal isOpen={modalIsOpen} >
                    <button onClick={setModalIsOpenToFalse}>x</button>
                    <UpdateModal renderPage={props.renderPage} setModalIsOpenToFalse={setModalIsOpenToFalse} />
                </Modal>
                {clientBrends && clientBrends.map((brend, i) => {
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
                                    <DeleteOutlined onClick={() => { deleteBrend(brend.clientBrendId,brend._id ) }} key="delete" />
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


// const initialValues = {
//     brendName : "",
//     indestry: "",
//     brendLink:"",
//     dollarCo: "",
//     pricing: "",
//     owner: [],
//     paymehod: "",
//     posts:[]
//   };