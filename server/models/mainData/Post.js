const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    campainName: {
        type: String,
    },
    postName: {
        type: String,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    about: {
        type: String,
    },
    postLink: {
        type: String,
    },
    platform: [
        { type: Schema.Types.ObjectId, ref: 'Platform' }
    ],
    targeting: {
        type: String
    },
    postPrice: {
        type: Number
    },
    goal: [
        { type: Schema.Types.ObjectId, ref: 'Goal' }
    ],
    fee:{
        type:Number
    },
    budgetNato:{
        type:Number
    },
    budgetType:{
        type:String,
        enum:['DAILY' , 'LIFETIME'],
        defualt:'DAILY'
    },
    status:{
        type:String
    },
    employe:[
        { type: Schema.Types.ObjectId, ref: 'Employe' }
    ]


});

//Export the model
module.exports = mongoose.model('posts', userSchema);