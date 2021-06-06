const express = require("express");
const clientRouter = express.Router();
const moment = require("moment");
const dbConfig = require("../config/config");
const mongoose = require("mongoose");
const Clients = require("../models/mainData/Clients");
const Brends = require("../models/mainData/Brend");
const Post = require("../models/mainData/Post");

///////get all the clients

clientRouter.get("/", async (req, res) => {
  Clients.find({})
    .populate("brends")
    .sort({ _id: -1 })
    .exec((err, allClients) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res.status(200).json({ allClients: allClients });
      }
    });
});

////get client by id

clientRouter.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  Clients.findById(id).exec((err, singleclient) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).json({ singleclient: singleclient });
    }
  });
});

////get clients by name

clientRouter.get("/name/:name", async (req, res) => {
  let { name } = req.params;
  console.log(name);
  Clients.find({ clientName: name }).exec((err, singleclient) => {
    if (err) {
      console.log("im here");
      res.status(400).send(err);
    } else {
      console.log("im there");
      res.status(200).send({ singleclient: singleclient });
    }
  });
});

////post new client route

clientRouter.post("/", async (req, res) => {
  const client = new Clients(req.body);
  console.log(client);
  client.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true, doc });
  });
});

////update client by identity

clientRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  Clients.findByIdAndUpdate(id, req.body, { new: true }).exec(
    (err, response) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log(response);
        res.status(200).send(response);
      }
    }
  );
});

////delete client by identity

clientRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  Clients.findByIdAndDelete(id).exec((err, response) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});

//////////////////////////BRANDS SECTION////////////////////////

//// brends for clients by id

clientRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  Clients.findOne({ _id: id })
    .populate("brends")
    .sort({ _id: -1 })
    .exec((err, allBrendsForClientById) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res
          .status(200)
          .json({ allBrendsForClientById: allBrendsForClientById });
      }
    });
});

////save brend to client id

clientRouter.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { brendData } = req.body;
  console.log(brendData);
  console.log("=================================================");
  const brend = new Brends({
    clientBrendId: id,
    brendName: brendData.brendName,
    indestry: brendData.indestry,
    brendLink: brendData.brendLink,
    dollarCo: brendData.dollarCo,
    pricing: brendData.pricing,
    owner: brendData.owner,
    paymehod: brendData.paymehod,
    posts: [],
  });
  console.log(brend);
  console.log("================================================");
  const findClient = await Clients.findOne({ _id: id }).exec();
  console.log(findClient);
  console.log(typeof findClient);
  brend.save((err, docs) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true, docs });
  });
  findClient.brends.push(brend);
  findClient.save();
});

///////delete brend from a client by Id

clientRouter.delete("/:id/:brendId", (req, res) => {
  const { id } = req.params;
  const _id = req.params.brendId;
  console.log(id);
  console.log(_id);
  const s = Clients.findByIdAndUpdate(
    { _id: id },
    { $pull: { brends: { _id: _id } } },
    { safe: true, multi: true },
    function (err, obj) {
      if (err) {
        console.log(err + "*************************");
      } else {
        Brends.findByIdAndDelete({ _id: _id }, function (err, response) {
          if (err) {
            return res.json({ success: false, err });
          } else {
            return res.status(200).send({ success: true, response });
          }
        });
      }
    }
  );
  console.log(s);
});
//////update brend by cilent id

clientRouter.put("/:id/:brendId", (req, res) => {
  const { id } = req.params;
  const _id = req.params.brendId;
  console.log(id);
  console.log(_id);
  const s = Clients.findByIdAndUpdate(
    { _id: id },
    { $pull: { brends: { _id: _id } } },
    { safe: true, multi: true },
    function (err, obj) {
      if (err) {
        console.log(err + "*************************");
      } else {
        Brends.findByIdAndUpdate(
          { _id: _id },
          req.body,
          { new: true },
          function (err, response) {
            if (err) {
              return res.json({ success: false, err });
            } else {
              return res.status(200).send({ success: true, response });
            }
          }
        );
      }
    }
  );
});

////////////////////POST SECTION ////////////////////////////

/////get posts for a brands by id
clientRouter.get("/:id/:brendId",async (req, res) => {
  const { id } = req.params;
  const _id = req.params.brendId;
  console.log(_id);

  const theClient = await Clients.findOne({ _id: id })
    .populate({
      path:"brends",
      match:{_id : _id}
    })
  const theBrend = theClient.brends[0].posts
  console.log(theBrend);
  if( theClient.brends[0]._id === _id){
    return res.status(400).send("error");
  } else {
        res
          .status(200).json({success:true , theBrend} )
 
      }
});





////save post to brend -> client id

clientRouter.post("/:id/:brendId", async (req, res) => {
  const { id } = req.params;
  const { brendId } = req.params;
  const { postData } = req.body;
  console.log(postData);
  console.log("=================================================");
  const brend = new Brends({
    clientBrendId: id,
    brendName: brendData.brendName,
    indestry: brendData.indestry,
    brendLink: brendData.brendLink,
    dollarCo: brendData.dollarCo,
    pricing: brendData.pricing,
    owner: brendData.owner,
    paymehod: brendData.paymehod,
    posts: [],
  });
  console.log(brend);
  console.log("================================================");
  const findClient = await Clients.findOne({ _id: id }).exec();
  brend.save((err, docs) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true, docs });
  });
  findClient.brends.push(brend);
  findClient.save();
});






module.exports = clientRouter;

///this is a regex exprasion\\\\\
// Clients.findById({clientName: new RegExp('^'+name+'$', "i")})
// .exec((err, allBrendsForClientById) => {
//   if (err) {
//     return res.status(400).send(err);
//   } else {
//     res
//       .status(200)
//       .json({ allBrendsForClientById: allBrendsForClientById });
//   }
// });
