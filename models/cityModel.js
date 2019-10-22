const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat city schema and model

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    }
});



module.exports = cityModel = mongoose.model('city', citySchema);