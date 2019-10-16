const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat city schema and model

const ItemSchema = new Schema({
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
   date: {
       type: Date,
       default: Date.now
   }
    //add geo-location
});



module.exports = Item = mongoose.model('item', ItemSchema);;