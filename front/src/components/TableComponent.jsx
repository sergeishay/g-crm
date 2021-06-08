
import '../styles/CllientsPage.css'
import React, { useState, useEffect, useContext, useMemo, useLayoutEffect } from 'react'
import { observer } from 'mobx-react-lite'
import BrendsStoreContext from '../Stores/Brend/BrendStore';
import ClientStoreContext from '../Stores/Client/ClientStore';
import PostStoreContext from '../Stores/PostStore';

import { useHistory } from "react-router-dom";
const initialValues = {
    NameGenerator: "",
    about: "",
    budgetNato: "",
    budgetType: "",
    campainName: "",
    employe: "",
    endTime: "",
    fee: "",
    goal: "",
    platform: "",
    postLink: "",
    postName: "",
    postPrice: "",
    startTime: "",
    status: "",
    _id: "",
    
  };
export const TableComponent = observer((props) => {
    const [isLoading, setLoading] = useState(true);
    const [brendPosts, setBrendPosts] = useState();
    const PostStore = useContext(PostStoreContext)
    const BrendStore = useContext(BrendsStoreContext)
    const ClientStore = useContext(ClientStoreContext)
    const history = useHistory();

    const brendPost = props.brendP
    console.log(brendPost)
    const initialValues = {
        NameGenerator: "",
        about:brendPost.about,
        budgetNato:brendPost.budgetNato,
        budgetType:brendPost.budgetType,
        campainName: brendPost.campainName,
        employe:brendPost.employe,
        endTime:brendPost.endTime,
        fee:brendPost.fee,
        goal:brendPost.goal,
        platform: brendPost.platform,
        postLink:brendPost.postLink,
        postName:brendPost.postName,
        postPrice: brendPost.postPrice,
        startTime:brendPost.startTime,
        status:brendPost.status,
        _id: "",
        
      };
    const [values, setValues] = useState(initialValues);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };
    //   function namegenerate(brendPost){
    //       let generate = "";
    //       for(let i = 0 ; i < brendPost.length ; i++){
    //         console.log(brendPost)

    //             let word = brendPost[i] + "|"
    //             console.log(word)
    //             generate.push(word)

    //       }
    //       return generate
    //   }
    const handleUpdate = async (evt) => {
        evt.preventDefault();
        const helder = {
            NameGenerator:
            values.campainName 
            +"|"+values.postName 
            +"|"+ values.about
            +"|"+ values.startTime
            +"|"+ values.endTime
            +"|"+ values.budgetType
            +"|"+ values.employe
            +"|"+ values.fee
            +"|"+ values.goal
            +"|"+ values.platform
            +"|"+ values.postLink
            +"|"+ values.budgetNato
            +"|"+ values.postPrice
            +"|"+ values.status
            +"|"+ values.employe
            ,
            about:values.about,
            budgetNato:values.budgetNato,
            budgetType:values.budgetType,
            campainName: values.campainName,
            employe:values.employe,
            endTime:values.endTime,
            fee:values.fee,
            goal:values.goal,
            platform: values.platform,
            postLink:values.postLink,
            postName:values.postName,
            postPrice: values.postPrice,
            startTime:values.startTime,
            status:values.status,
            _id:brendPost._id,
        }
        await PostStore.updatePostByBrendId(props.clientId,props.brendId,brendPost._id,helder);
        
    }  
    const handleDelete = async (evt) => {
        evt.preventDefault();
        const {clientId} = props
        const {brendId} = props
        const postId = brendPost._id
        const idDeleted = await PostStore.deletePostFromBrend(clientId,brendId,postId);
        console.log(idDeleted)
        if(idDeleted.success){
            props.setRequestData(new Date());
        }
        
    }  




    return (
        <div className='postContainer' >
            <div  className="tabelContainer">
                {
                    <table >
                        <tbody >
                            
                            
                            <td><input  className="line" value={`${values.campainName}`||"campain Name"} onChange={handleInputChange} name="campainName"/></td>
                            <td><input className="line" value={`${values.postName}`||"post Name"} onChange={handleInputChange} name="postName"/></td>
                            <td><input className="line" value={`${values.platform}`||"platform"} onChange={handleInputChange} name="platform"/></td>
                            <td><input className="line" value={`${values.postPrice}`||"post Price"} onChange={handleInputChange} name="postPrice"/></td>
                            <td><input className="line" value={`${values.goal}`||"goal"} onChange={handleInputChange} name="goal"/></td>
                            <td><input  className="line" value={`${values.fee}`||"fee"} onChange={handleInputChange} name="fee"/></td>
                            <td><input  className="line" value={`${values.startTime}`||"start Time"} onChange={handleInputChange} name="startTime"/></td>
                            <td><input  className="line" value={`${values.endTime}`||"end Time"} onChange={handleInputChange} name="endTime"/></td>
                            <td><input className="line" value={`${values.about}`||"about"} onChange={handleInputChange} name="about"/></td>
                            <td><input className="line" value={`${values.postLink}`||"postLink"} onChange={handleInputChange} name="postLink"/></td>
                            <td><input  className="line" value={`${values.budgetNato}`||"budget Nato"} onChange={handleInputChange} name="budgetNato"/></td>
                            <td><input  className="line" value={`${values.budgetType}`||"budget Type"} onChange={handleInputChange} name="budgetType"/></td>
                            <td><input className="line" value={`${values.status}`||"status"} onChange={handleInputChange} name="status"/></td>
                            <td><input className="line" value={`${values.employe}`||"employe"} onChange={handleInputChange} name="employe"/></td>
                            <td><input className="line"  
                            value={`${values.campainName} | ${values.postName} | ${values.platform} | ${values.postPrice} | ${values.goal} | ${values.fee} | ${values.startTime} | ${values.endTime} | ${values.about} | ${values.postLink} | ${values.budgetNato} | ${values.budgetType} | ${values.status} | ${values.postPrice}` }
                             onChange={handleInputChange} name="NameGenerator"/></td>
                            <td><button onClick={handleUpdate} className="btnUpdate">Update</button></td>
                            <td><button onClick={handleDelete} className="btnDelete">delete</button></td>
                            
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
)

export default TableComponent