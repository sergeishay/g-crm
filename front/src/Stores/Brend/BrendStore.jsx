import React, { Component } from 'react';
import { observable, action, computed, get } from 'mobx';
import { createContext } from 'react';
import axios from 'axios'
import { BrendData } from './BrendData'
import { FaCommentsDollar } from 'react-icons/fa';



class BrendsStore {
    @observable listOfBrendsforClient = [];
    @observable correntClient = [];
    @observable correntBrend = [];
    constructor() {
        // this.init()
    }


    ////////////////create new Brend
    @action async creatNewBrend(clientId, brendData) {
        console.log(clientId)
        console.log(brendData)

        const createBrend = await axios.post(`http://localhost:8080/clients/${clientId}`, { brendData })
        console.log(createBrend.data.docs)
        console.log(this.correntClient)
        this.correntClient[0].brends.unshift(createBrend.data.docs)
    }

    ////////////////delete a Brend from client
    @action async deleteBrendFromClient(clientId, brendId) {
        console.log(clientId)
        console.log(brendId)
        const theBrendToDelete = await axios.delete(`http://localhost:8080/clients/${clientId}/${brendId}`)
        console.log(theBrendToDelete)
        if (theBrendToDelete.data.success) {
            console.log(typeof theBrendToDelete.data.response)
            console.log(`${this.correntClient[0]} correntClient`)
            const updateClient = { ...this.correntClient }
            const updateBrends = [...this.correntClient[0].brends]
            console.log(updateClient[0].brends + "  update client before")
            const newArr = []
            const newmap = updateClient[0].brends.map(brend => {
                console.log(typeof brend._id)
                console.log(typeof theBrendToDelete.data.response._id)
                if (brend._id !== theBrendToDelete.data.response._id) {
                    newArr.push(brend)
                }
            });
            console.log(newmap)
            console.log(newArr)
            updateClient[0].brends.splice(0, updateClient[0].brends.length, ...newArr)
            this.correntClient[0] = updateClient[0]
            console.log(this.correntClient[0])

        }

    }

    //////update brand client by id
    @action async updateBrandByClientId(clientId, brendId, data) {
        const updatedBrend = await axios.put(`http://localhost:8080/clients/${clientId}/${brendId}`, data)
        if (updatedBrend.data.success) {
            const updateClientBrend = { ...this.correntClient }
            let checker = updateClientBrend[0];
            const inr = checker.brends.findIndex(id => id._id === brendId )
            updateClientBrend[0].brends[inr] = updatedBrend.data.response;
        }
    }

}




const BrendsStoreContext = createContext(new BrendsStore())
export default BrendsStoreContext;

