
import '../styles/postPage.css'
import React, { useState, useEffect, useContext, useMemo, useLayoutEffect } from 'react'
import axios from 'axios';
import { Tooltip, Button, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import BrendsCardComponent from './BrendsCardComponent'
import Modal from 'react-modal'
import { observer } from 'mobx-react-lite'
import BrendsStoreContext from '../Stores/Brend/BrendStore';
import ClientStoreContext from '../Stores/Client/ClientStore';
import PostStoreContext from '../Stores/PostStore';
import TableComponent from '../components/TableComponent';
import { useHistory } from "react-router-dom";

export const PostPage = observer((props) => {
    const [isLoading, setLoading] = useState(true);
    const [brendPosts, setBrendPosts] = useState();
    const [requestData, setRequestData] = useState(new Date());
    const PostStore = useContext(PostStoreContext)
    const BrendStore = useContext(BrendsStoreContext)
    const ClientStore = useContext(ClientStoreContext)
    const history = useHistory();


    const correntBrend = PostStore.correntBrend;
    console.log(correntBrend);
    const clientsBrendsById = BrendStore.correntClient;
    const brendName = correntBrend[0].brendName;
    const brendId = correntBrend[0]._id;
    const clientId = correntBrend[0].clientBrendId
    console.log(brendId)
    console.log(clientId)
    // const PostsByBrendId = PostStore.correntBrendPosts[0];
    // console.log(PostsByBrendId);



    const handleNewPost = async (evt) => {
        evt.preventDefault();
        const helder = {
            NameGenerator:"",
            about:"",
            budgetNato:"",
            budgetType:"DAILY",
            campainName:"",
            employe:"",
            endTime:"",
            fee:0,
            goal:"",
            platform:"",
            postLink:"",
            postName:"",
            postPrice:0,
            startTime:"",
            status:"",
            
        }
       const newPost = await PostStore.creatNewPost(clientId,brendId,helder);
       console.log(newPost); 
       if(newPost.success){
        setRequestData(new Date())
       }
    } 












    useEffect(async () => {
        await axios.get(`http://localhost:8080/clients/${clientId}/${brendId}`).then(response => {
            console.log(response.data.theBrend)
            setBrendPosts(response.data.theBrend);
            setLoading(false);
        });
    }, [requestData]);

    if (isLoading) {
        console.log("hereeeeeeeeeee Im hereee")
        return <div className="App">Loading...</div>;
    } else  {

        return (
            <div key={Math.random()} className='postsContainer' >
                <h1 className="postsTitle">{brendName}</h1>
                <div key={Math.random()} className="tabelContainer">
                    <table  key={Math.random()}>
                        <thead  key={Math.random()}>
                            <tr className="tableHeaders"  key={Math.random()}>
                                <th key="categoryTitle" className="category">Campian Name</th>
                                <th key="AmoutTitle" className="category">post name</th>
                                <th key="vendorTitle" className="category">platform</th>
                                <th key="vendorTitle" className="category">post price</th>
                                <th key="categoryTitle" className="category">goal</th>
                                <th key="AmoutTitle" className="category">fee</th>
                                <th key="vendorTitle" className="category">Start Time</th>
                                <th key="vendorTitle" className="category">End Time</th>
                                <th key="categoryTitle" className="category">About</th>
                                <th key="AmoutTitle" className="category">Post Link</th>
                                <th key="vendorTitle" className="category">Vendor</th>
                                <th key="vendorTitle" className="category">Delete</th>
                                <th key="categoryTitle" className="category">Category</th>
                                <th key="AmoutTitle" className="category">Amount</th>
                            </tr>
                        </thead>
                    </table>
                    {brendPosts && brendPosts.map((post,i) => {
                        return(
                        <div>
                             <TableComponent key={i} setRequestData={setRequestData} brendP={post} brendId={brendId} clientId={clientId}/>
                        </div>
                        )
                    })}
                    <div className="newPostContainer">
                        <button onClick={handleNewPost} className="newBtnPost">add New Post</button>
                    </div>
                </div>
               
                <div className="backToHomePage">
                          <button className="back" onClick={() => history.goBack()}>Back to All Brands</button>
                </div>
                
            </div>
        )
    }
})

export default PostPage