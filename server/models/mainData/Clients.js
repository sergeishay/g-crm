const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientsSchema = new Schema({
    clientName: String,
    clientLink: String
})

const Clients = mongoose.model('clients', clientsSchema)
module.exports = Clients