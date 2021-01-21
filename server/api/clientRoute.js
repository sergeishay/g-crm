const express = require('express')
const clientRouter = express.Router()
const moment = require('moment')
const dbConfig = require("../config/config");
const mongoose = require("mongoose");
const Clients = require("../models/mainData/Clients")
const Brends = require("../models/mainData/Brend")

///////get all the clients

clientRouter.get('/',async (req, res) => {
  Clients.find({}).populate("brends").sort({ _id: -1 })
    .exec((err, allClients) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        res.status(200).json({ allClients: allClients })
      };
    });
});

////get client by id


clientRouter.get('/id/:id', async (req, res) => {
  const { id } = req.params
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

clientRouter.get('/name/:name', async (req, res) => {
  let { name } = req.params
  console.log(name)
  Clients.find({ clientName: name })
    .exec((err, singleclient) => {
      if (err) {
         console.log("im here")
        res.status(400).send(err)
      } else {
        console.log("im there")
        res.status(200).send({ singleclient: singleclient })
      };
    })
});


clientRouter.post('/',async (req, res) => {
  const client = new Clients(req.body)
  console.log(client)
  client.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({ success: true, doc })
  });
});


clientRouter.put('/:id',async (req, res) => {
  const { id } = req.params
  console.log(id)
  Clients.findByIdAndUpdate(id ,req.body ,{new : true}).exec((err, response) => {
    if (err) {
      console.log(err)
      res.status(400).send(err)
    } else {
      console.log(response)
      res.status(200).send(response)
    }
  })
})


clientRouter.delete('/:id',async (req, res) => {
  const { id } = req.params
  console.log(id)
  Clients.findByIdAndDelete(id).exec((err, response) => {
    if (err) {
      return res.status(400).send(err)
    } else {
      res.status(200).send(response)
    }
  })
})

//// brends for clients by id

clientRouter.get('/:id', (req, res) => {
  const {id} = req.params
  Clients.findOne({_id:id}).populate("brends").sort({ _id: -1 })
    .exec((err, allBrendsForClientById) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        res.status(200).json({ allBrendsForClientById: allBrendsForClientById } )
      };
    });
});


clientRouter.post('/:id',async (req, res) => {
  const {id} = req.params
  console.log(id)
  const brend = new Brends(req.body)
  const findClient = await Clients.findOne({_id:id}).exec()
  console.log(findClient)
  console.log(typeof findClient)
       brend.save((err , docs) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({ success: true, docs })
      })
      findClient.brends.push(brend)
      findClient.save()
});

clientRouter.put('/:id',async (req, res) => {
  const { id } = req.params
  console.log(id)
  Clients.findByIdAndUpdate(id ,req.body ,{new : true}).exec((err, response) => {
    if (err) {
      console.log(err)
      res.status(400).send(err)
    } else {
      console.log(response)
      res.status(200).send(response)
    }
  })
})








module.exports = clientRouter



///this is a regex exprasion\\\\\
// Clients.findById({clientName: new RegExp('^'+name+'$', "i")})