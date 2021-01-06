
import React, { useState, useEffect } from 'react'
import axios from '../../node_modules/axios';
import { Card, Avatar, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import CardComponent from './CardComponent'


const ClientsPage = () => {

    const [Clients, setClients] = useState([])
    const [Number , setNumber] =useState(0)

    // const getPosts = async () => {
    //     try {
    //   const clientsData = await axios.get(`http://localhost:8080/clients`)
          
    //       console.log(clientsData.data.allClients);
    //       setClients(clientsData.data.allClients)
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   };
    //   useEffect(()=>{
    //       getPosts()
    //   } ,[])




    useEffect( () => {
        axios.get(`http://localhost:8080/clients`)
        .then((data) => {
            console.log(data.data)
            setClients(data.data.allClients)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])


    console.log("het")
    return (
        <div className="clientsPageBody">
            {console.log(Clients)}
            <h1>hello</h1>

            <Row gutter={[16, 16]}>
                {Clients && Clients.map((client, i) => {
                    
                    <React.Fragment key={i}>
                        <CardComponent
                            clientData={client}
                            num={Number}
                        />
                    </React.Fragment>

                })}
            </Row>
        </div>
    )
}

export default ClientsPage
