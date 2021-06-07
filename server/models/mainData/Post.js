const mongoose = require('mongoose'); // Erase if already required


var postSchema = new mongoose.Schema({

    campainName: {
        type: String,
    },
    postName: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    about: {
        type: String,
    },
    postLink: {
        type: String,
    },
    platform: {
        type: String,
    },
    targeting: {
        type: String
    },
    postPrice: {
        type: Number
    },
    goal: {
        type: String,
    },
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
    employe:{
        type: String,
    },
    NameGenerator:{
        type:String,
    },

    

});

//Export the model
module.exports = mongoose.model('Post', postSchema);

