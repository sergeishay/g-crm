import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import BrendsStoreContext from '../Stores/Brend/BrendStore';
import PostStoreContext from '../Stores/PostStore';
import { Card, Avatar, Row, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined, SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import BrendUpdateModal from './Modals/BrendUpdateModal';
import Modal from 'react-modal';
const { Meta } = Card;



const BrendsCardComponent = observer((props) => {
    const BrendsStore = useContext(BrendsStoreContext)
    const PostStore = useContext(PostStoreContext)
    const theClient = BrendsStore.correntClient[0]
    const clientBrends = BrendsStore.correntClient[0].brends
    console.log(clientBrends)
    console.log(theClient)

    const [updateClientBrend, setUpdateClientBrend] = useState(clientBrends)
    const [loading , setLoading] = useState(true)
    const [modalIsOpen, setModalIsOpen] = useState(false);

  //////delete brend by client id
    const deleteBrend = async (id ,brendId) => {
        // const clientID = id
       const deleteBrendFromClient = await BrendsStore.deleteBrendFromClient(id , brendId)
       
       setUpdateClientBrend(deleteBrendFromClient)
    }

  //////update brend by client id

    const getCorrentBrends = (clickBrend) => {
        console.log(clickBrend)
        let thisClientBrend = clientBrends.filter(brendid => brendid._id === clickBrend)
        console.log(thisClientBrend)
        BrendsStore.correntBrend = [thisClientBrend]
        setUpdateClientBrend(thisClientBrend)
    }


    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }
    const getAndupdateBrendByClientId =async (id,brendId) => {
          const updateBrend = BrendsStore.updateBrandByClientId(id , brendId);
          console.log(updateBrend)
    }
    const getPostsByBrendId = (clickBrend) =>{
          console.log(clickBrend)
          PostStore.getAllPostForABrend(theClient._id,clickBrend._id)
          PostStore.correntBrend = [clickBrend];
    }
    useEffect(() => {
        Modal.setAppElement('body')
    }, [clientBrends])



    if (clientBrends.length > 0) {
        return (
            <>
                <Modal isOpen={modalIsOpen} >
                    <button onClick={setModalIsOpenToFalse}>x</button>
                    <BrendUpdateModal renderPage={props.renderPage} updateClientBrend={updateClientBrend} setModalIsOpenToFalse={setModalIsOpenToFalse} />
                </Modal>
                {clientBrends && clientBrends.map((brend, i) => {
                    return (
                        <div key={i} className="cardComp">
                            <Card
                                onClick={(() => { getPostsByBrendId(brend) })}
                                title={<Link style={{ color: 'black', underline: 'none' }} to={`/clients/${theClient.clientName}/${brend.brendName}`}>{brend.brendName}</Link>}                            
                                cover={<Link to={`/clients/${theClient.clientName}/${brend.brendName}`}><img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                /></Link>}
                                actions={[
                                    <EditOutlined onClick={() => { { getCorrentBrends(brend._id) }; setModalIsOpenToTrue() }} key="edit" />,
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