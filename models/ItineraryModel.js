const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat Itinerary schema and model
const ItinerarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userphoto: {
        type: String
    },
    rating: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    hashtags: {
        type: [],
        required: true
    },
    img: {
        type: String
    },
    comments: {
        type:Array
    },
    activities: {
        type:Array
    }
});

module.exports = Itinerary = mongoose.model('itinerary', ItinerarySchema);