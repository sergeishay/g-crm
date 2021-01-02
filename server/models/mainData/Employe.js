const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var employeSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,

    },
    phone:{
        type:String,

    },
    password:{
        type:String,
    },
});

//Export the model
module.exports = mongoose.model('employe', employeSchema);