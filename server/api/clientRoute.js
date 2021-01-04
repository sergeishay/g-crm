const express = require('express')
const clientRouter = express.Router()
const moment = require('moment')
const dbConfig = require("../config/config");
const mongoose = require("mongoose");
const Clients = require("../models/mainData/Clients")

///////get all the clients

clientRouter.get('/', (req, res) => {
  Clients.find({}).sort({ _id: -1 })
    .exec((err, allClients) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        res.status(200).json({ allClients: allClients })
      };
    });
});

//////get client by id

clientRouter.get('/:id', (req, res) => {
  const {id} = req.params
  console.log(id)
  Clients.findById(id)
    .exec((err, singleclient) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        res.status(200).json({ singleclient: singleclient })
      };
    });
});

////get clients by name 

clientRouter.get('/:name', async (req, res) => {
  let {name} =req.params
  json.parse(name)
  await Clients.find({ clientName:name })
    .exec((err, singleclient) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        console.log(singleclient)
        res.status(200).json({ singleclient: singleclient })
      };
    });
});






clientRouter.post('/', (req, res) => {
  const client = new Clients(req.body)
  client.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true, doc })
  });
});


clientRouter.put('/:id', (req, res) => {
  const {id} = req.params
  console.log(id)
  Clients.findByIdAndUpdate(id).exec((err , response)=>{
    if(err){
      return res.status(400).send(err)
    }else{
      res.status(200).send(response)
    }
  })
})


clientRouter.delete('/:id', (req, res) => {
  const {id} = req.params
  Clients.findByIdAndDelete(id).exec((err , response)=>{
    if(err){
      return res.status(400).send(err)
    }else{
      res.status(200).send(response)
    }
  })
})



module.exports = clientRouter



///this is a regex exprasion\\\\\
// Clients.findById({clientName: new RegExp('^'+name+'$', "i")})