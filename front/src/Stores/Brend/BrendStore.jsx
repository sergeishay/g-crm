import React, { Component } from 'react';
import { observable, action, computed, get } from 'mobx';
import { createContext } from 'react';
import axios from 'axios'
import { BrendData } from './BrendData'



class BrendsStore {
    @observable listOfBrendsforClient = [];
    @observable correntClient = [];
    @observable correntBrend = [];
    constructor() {
        // this.init()
    }



    @action async creatNewBrend(clientId, brendData) {
        console.log(clientId)
        console.log(brendData)

        const createBrend = await axios.post(`http://localhost:8080/clients/${clientId}`, { brendData })
        console.log(createBrend.data.docs)
        console.log(this.correntClient)
        this.correntClient[0].brends.unshift(createBrend.data.docs)
    }


    @action async deleteBrendFromClient(clientId, brendId) {
        console.log(clientId)
        console.log(brendId)

        const theBrendToDelete = await axios.delete(`http://localhost:8080/clients/${clientId}/${brendId}`)
        console.log(theBrendToDelete)
        if (theBrendToDelete.data.success) {
            console.log(typeof  theBrendToDelete.data.response)
            console.log(`${this.correntClient[0]} correntClient`)
            const updateClient = {...this.correntClient}
            const updateBrends = [...this.correntClient[0].brends ]
            console.log(updateClient[0].brends + "  update client before")
            const newArr = []
            const newmap = updateClient[0].brends.map(brend=>{
                console.log( brend._id)
                console.log( theBrendToDelete.data.response._id)
                if(brend._id !== theBrendToDelete.data.response._id){
                    newArr.push(brend)
                }
            })
            // updateClient[0].brends.filter((brend) => {
                
            //     console.log( brend._id)
            //     console.log( brend)
            //     console.log( theBrendToDelete.data.response._id)
            //     console.log( theBrendToDelete.data.response)

            //     return brend._id !== theBrendToDelete.data.response._id
            // })
            console.log(newmap)
            console.log(newArr)
            // console.log(updateClient[0].brends + " update client after")

            // const index = this.correntClient[0].brends.find(theBrendToDelete.data.response._id)
            updateClient[0].brends.splice(0,updateClient[0].brends.length ,...newArr)
            this.correntClient[0] = updateClient[0]
            console.log(this.correntClient[0])
            // this.correntClient[0].brends.splice(index, 1)
            // console.log(this.correntClient[0].brends)
        }

    }












    // init = async () => {
    //     await this.getAllBrendsByClientID();
    // }
    // clientBrendId, id, clientBrendName, brendName, brendLink, indestry, dollarCo, pricing, owner, paymehod, posts
    // @action async getAllBrendsByClientID(id) {

    //     await axios.get(`http://localhost:8080/clients/${id}`)
    //         .then((data) => {
    //             this.listOfBrendsforClient = data.data.allBrendsForClientById.brends

    //         }
    //         )
    //         .catch ((error) => {
    //         console.log(error)
    //     })

    //     console.log(this.listOfBrendsforClient)
    // }

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