import React, { Component } from 'react';
import { observable, action, computed, get, runInAction } from 'mobx';
import { createContext } from 'react';
import axios from 'axios'
import ClientData from './ClientData'
import { act } from '@testing-library/react';




class ClientStore {
    @observable listOfClients = [];

    constructor() {
        this.loading = false
        this.init()
    }
    init = async () => {
        await this.getAllClients()
    }

    @action async getAllClients() {
        this.loading = true
        const clientData = await axios.get(`http://localhost:8080/clients`)
        runInAction(() => {
            this.listOfClients = clientData.data.allClients
            this.loading = false
        })

    }
    @action async getClientById(id) {
        const data = await axios.get(`http://localhost:8080/clients/${id}`)
        console.log(data)
        return data
    }

    @action async createClient(newClient) {
        const theClient = await axios.post(`http://localhost:8080/clients`, newClient)
        console.log(theClient.data.doc)
        this.listOfClients.unshift(theClient.data.doc)
        console.log(this.listOfClients)
    }

    @action async deleteClient(id) {
        console.log(id)
        const deleted = await axios.delete(`http://localhost:8080/clients/${id}`, { id: id })
        console.log(deleted)
        const newListOfClients = this.listOfClients.filter(clientId => clientId._id !== id)
        this.listOfClients = newListOfClients
    }



    @action async updateClient(data) {
        const UpdatedClient = await axios.put(`http://localhost:8080/clients/${data.id}`, data)
        console.log(UpdatedClient)
        const index = this.listOfClients.findIndex(index => index._id === data.id)
        this.listOfClients[index] = data
        console.log(index)
    }

}
const ClientStoreContext = createContext(new ClientStore())
export default ClientStoreContext;