const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientsSchema = new Schema({
    clientName: String,
    clientLink: String,
    brends : [
        { type: Schema.Types.ObjectId, ref: 'Brend' },
    ]
})

const Clients = mongoose.model('clients', clientsSchema)
module.exports = Clients