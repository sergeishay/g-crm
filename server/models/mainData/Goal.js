const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var goalSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

//Export the model
module.exports = mongoose.model('goal', goalSchema);