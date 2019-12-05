const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat Activity schema and model
const ActivitySchema = new Schema({
    itinerary: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

module.exports = Activity = mongoose.model('activity', ActivitySchema);