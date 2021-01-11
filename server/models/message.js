const mongoose = require('mongoose');

const Message = mongoose.model('Message',

    mongoose.Schema({

        message: {
            type: String,
            required: true
        },


        user: {
            type: String,
            required: true
        },


    })


)

module.exports = Message 