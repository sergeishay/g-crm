import React, { Component } from 'react';
import { observable, action, computed, get } from 'mobx';
import { createContext } from 'react';
import axios from 'axios'




class PostStore {
    @observable listOfPostForBrend = [];
    @observable correntClient = [];
    @observable correntBrendPosts = [];
    @observable correntBrend= [];
    constructor() {
        // this.init()
    }

    @action async getAllPostForABrend(clientId , brendId){
        console.log(clientId)
        console.log(brendId)

        // const getPosts = await axios.get(`http://localhost:8080/clients/${clientId}/${brendId}`)
        // console.log(getPosts)
        // const updateBrendPoss = [...this.correntBrendPosts]
        // updateBrendPoss.push(getPosts.data.theBrend)
        // this.correntBrendPosts = updateBrendPoss
        // console.log(this.correntBrendPosts)
    }

    ////////////////create new Post
    @action async creatNewPost(clientId,brendId, postData) {
        console.log(clientId)
        console.log(postData)

        const createPost = await axios.post(`http://localhost:8080/clients/${clientId}/${brendId}`, { postData })
        console.log(createPost.data)
        return createPost.data
        // console.log(this.correntClient)
        // this.correntClient[0].brends.unshift(createPost.data.docs)
    }

    ////////////////delete a Post from brend
    @action async deletePostFromBrend(clientId, brendId ,postId) {
        console.log(clientId)
        console.log(brendId)
        console.log(postId)
        const thePostToDelete = await axios.delete(`http://localhost:8080/clients/${clientId}/${brendId}/${postId}`)
        console.log(thePostToDelete)
        if (thePostToDelete.data.success) {
            console.log(thePostToDelete.data.response)
            console.log(`${this.listOfPostForBrend} correntBrend`)
            // const updateClient = { ...this.correntClient }
            // console.log(updateClient[0].brends + "  update client before")
            // const newArr = []
            // const newmap = updateClient[0].brends.map(brend => {
            //     console.log(typeof brend._id)
            //     console.log(typeof thePostToDelete.data.response._id)
            //     if (brend._id !== thePostToDelete.data.response._id) {
            //         newArr.push(brend)
            //     }
            // });
            // console.log(newmap)
            // console.log(newArr)
            // updateClient[0].brends.splice(0, updateClient[0].brends.length, ...newArr)
            // this.correntClient[0] = updateClient[0]
            // console.log(this.correntClient[0])

        }
        return thePostToDelete.data
    }

    //////update Post by brend by id
    @action async updatePostByBrendId(clientId, brendId,postId, data) {
        console.log(clientId, brendId,postId, data)
        const updatedBrend = await axios.put(`http://localhost:8080/clients/${clientId}/${brendId}/${postId}`, data)
        console.log(updatedBrend)
        if (updatedBrend.data.success) {
        console.log(updatedBrend.data.success)

            // const updateClientBrend = { ...this.correntClient }
            // let checker = updateClientBrend[0];
            // const inr = checker.brends.findIndex(id => id._id === brendId )
            // updateClientBrend[0].brends[inr] = updatedBrend.data.response;
        }
    }

}




const PostStoreContext = createContext(new PostStore())
export default PostStoreContext;

