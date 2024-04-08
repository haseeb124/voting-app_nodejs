const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    cnic: {
        type: Number,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ["voter", 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }

});


const User = mongoose.model("uservotingschema", userScehma);

module.exports = User;