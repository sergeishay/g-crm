const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BrendSchema = new mongoose.Schema({
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
    owner :[
        { type: Schema.Types.ObjectId, ref: 'Employe' }
    ],
    paymehod:{
        type:String,
        enum : ['RETAINER' , 'SOME' , 'OTHER'],
        default : 'RETAINER'

    },
    pricing:{
        type:Number,
        required:true,
    },
    posts:[
        { type: Schema.Types.ObjectId, ref: 'Post' },
    ]
});

//Export the model


const Brend = mongoose.model('brends', BrendSchema)
module.exports = Brend