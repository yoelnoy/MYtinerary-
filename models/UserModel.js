const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat user schema and model

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    favorites: {
        type:Array
    }
});



module.exports = User = mongoose.model('user', UserSchema);