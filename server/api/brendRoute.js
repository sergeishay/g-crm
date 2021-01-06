const express = require('express')
const brendRouter = express.Router()
const moment = require('moment')
const dbConfig = require("../config/config");
const mongoose = require("mongoose");
const Brends = require("../models/mainData/Brend")


/////get all brends

brendRouter.get('/', (req, res) => {
  Brends.find({}).sort({ _id: -1 })
    .exec((err, allBrends) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        res.status(200).json({ allBrends: allBrends })
      };
    });
});

//////get brend by id

brendRouter.get('/id/:id', (req, res) => {
  const {id} = req.params
  console.log(id)
  Brends.findById(id)
    .exec((err, singleBrend) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        res.status(200).json({ singleBrend: singleBrend })
      };
    });
});


/// get by brend name


brendRouter.get('/name/:name', (req, res) => {
  const name = toLowerCase(req.params.name)
  Brends.findById({brendName: `${name}`})
    .exec((err, singleBrend) => {
      if (err) {
        return res.status(400).send(err)

      } else {
        res.status(200).json({ singleBrend: singleBrend })
      };
    });
});

brendRouter.post('/', (req, res) => {
  const client = new Brends(req.body)
  client.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true, doc })
  });
});


brendRouter.put('/id/:id', (req, res) => {
  const {id} = req.params
  Brends.findByIdAndUpdate(id  ,req.body ,{new : true}).exec((err , response)=>{
    if(err){
      return res.status(400).send(err)
    }else{
      res.status(200).send(response)
    }
  })
})






brendRouter.delete('/:id', (req, res) => {
  const {id} = req.params
  Brends.findByIdAndDelete(id).exec((err , response)=>{
    if(err){
      return res.status(400).send(err)
    }else{
      res.status(200).send(response)
    }
  })
})




  module.exports = brendRouter
  