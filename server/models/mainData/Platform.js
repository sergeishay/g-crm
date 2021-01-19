const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var PlatformSchema = new mongoose.Schema({
    name:{
        type:String,
    }
});

//Export the model
module.exports = mongoose.model('platform', PlatformSchema);