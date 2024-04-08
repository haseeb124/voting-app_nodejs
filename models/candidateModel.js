const mongoose = require('mongoose');

const candidateScehma = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user :{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'uservotingschema'
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount : {
        type: Number,
        default: 0
    }

});


const Candidate = mongoose.model("candidatevotingschema", candidateScehma);

module.exports = Candidate;