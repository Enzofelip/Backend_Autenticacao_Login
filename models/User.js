const mongoose = require("../db/config");

const {Schema} = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        phone:{
            type: String,
            required: true
        }

    })
)

module.exports = User