const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat user schema and model

const AuthSchema = new Schema({

    username: String,
    googleId: String,
    img: String

});



module.exports = Auth = mongoose.model('googleUser', AuthSchema);