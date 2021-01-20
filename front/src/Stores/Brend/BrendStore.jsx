import React, { Component } from 'react';
import { observable, action, computed, get } from 'mobx';
import { createContext } from 'react';
import axios from 'axios'
import BrendData from './BrendData'



class BrendsStore {
    @observable listOfBrendsforClient = [];

    constructor() {
        // this.init()
    }
    // init = async () => {
    //     await this.getAllBrendsByClientID();
    // }
    // clientBrendId, id, clientBrendName, brendName, brendLink, indestry, dollarCo, pricing, owner, paymehod, posts
    @action async getAllBrendsByClientID(id) {
        const listData = []
        await axios.get(`http://localhost:8080/clients/${id}`)
            .then((data) => {
                // console.log(data.data.allBrendsForClientById.brends)
                for (let b of data.data.allBrendsForClientById.brends) {
                    listData.push(
                        new BrendData(
                            b.clientBrendId,
                            b._id,
                            b.clientBrendName,
                            b.brendName,
                            b.brendLink,
                            b.indestry,
                            b.dollarCo,
                            b.pricing,
                            b.owner,
                            b.paymehod,
                            b.posts
                        )
                    )
                }
                this.listOfBrendsforClient = listData
                return this.listOfBrendsforClient
            }
            )
            .catch ((error) => {
            console.log(error)
        })
        console.log(listData)
        // console.log(this.listOfBrendsforClient)
    }
    // @action async getClientById (id){
    //     const data = await axios.get(`http://localhost:8080/clients/${id}`)
    //     return data
    // }

    // @action async createClient(newClient){
    //     await axios.post(`http://localhost:8080/clients` , newClient)

    // }
    // @action async deleteClient(id){
    //     await axios.delete(`http://localhost:8080/clients/${id}`, {id : id})
    //     const deleteClient = [...this.listOfClients]
    //     deleteClient.filter(clientId => clientId.id===id)
    //     console.log(deleteClient)
    // }



    // @action async updateClient(data){
    //     console.log(data)
    //     await axios.put(`http://localhost:8080/clients/${data.id}` , data)
    // }

}
const BrendsStoreContext = createContext(new BrendsStore())
export default BrendsStoreContext;