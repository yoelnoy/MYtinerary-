const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat city schema and model
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
        // unique: true
    },
    country: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    }
});


module.exports = Item = mongoose.model('item', ItemSchema);