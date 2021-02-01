const mongoose = require('mongoose'); // Erase if already required
const Schema = mongoose.Schema
// Declare the Schema of the Mongo model
var BrendSchema = new Schema({
    clientBrendId :  { type: Schema.Types.ObjectId, ref: 'Clients' },
    brendName : String,
    indestry:{
        type:String
    },
    brendLink:{
        type:String,
    },
    dollarCo:{
        type:Number,
    },
    pricing:{
        type:Number,
    },
    owner :{
        type:String,
    },
    paymehod:{
        type:String,
        enum : ['RETAINER' , 'SOME' , 'OTHER'],
        default : 'RETAINER'

    },

    posts:[
        { type: Schema.Types.ObjectId, ref: 'Post' },
    ]
});

//Export the model


const Brend = mongoose.model('Brend', BrendSchema)
module.exports = Brend


// http://localhost:8080/clients/6005a7451baacf5464add47d