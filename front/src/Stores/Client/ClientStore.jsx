import React, { Component } from 'react';
import {observable ,action, computed, get } from 'mobx' ; 
import {createContext } from 'react';
import axios from 'axios'
import ClientData from './ClientData'
import { act } from '@testing-library/react';



 class ClientStore {
    @observable listOfClients = [];

    constructor(){
        this.init()
    }
    init = async () => {
        await this.getAllClients();
    }

    @action async getAllClients(){
        const listData = [];
        await axios.get(`http://localhost:8080/clients`)
        .then((data) => {
            // id , clientName , clientLink , brends , urlPick
            // console.log(data.data.allClients)
            this.listOfClients = data.data.allClients;
            for(let c of data.data.allClients){
                listData.push(
                    new ClientData(
                        c._id,
                        c.clientName,
                        c.clientLink,
                        c.brends,
                        c.urlPick
                    )
                )
            }
        })
        .catch((error) => {
            console.log(error)
        })
        this.listOfClients = listData
        console.log(listData)
    }
    
}
const ClientStoreContext = createContext(new ClientStore())
export default ClientStoreContext;