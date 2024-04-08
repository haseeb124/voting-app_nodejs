const Candidate = require('../models/candidateModel');
const User = require('../models/userModel');

const castingvote = async (req, res) => {
    const candidateID = req.params.candidateID;
    const userId = req.user.id;

    try {
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({message: "candidate not found"});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "user not found"})
        }

        if(user.role === 'admin'){
            return res.status(403).json({message: "admin can't vote"})
        }

        if(user.isVoted){
            return res.status(403).json({message: "you have already voted"});
        }

        await candidate.votes.push({user: userId});
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true
        await user.save();

        res.status(200).json({message: "voted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
};

const voteCount = async (req, res) => {

    try {
        const candidates = await Candidate.find().sort({voteCount: 'desc'})
        const voteRocord = candidates.map((data) => {
            return {
                party : data.party,
                count: data.voteCount
            }
        });

        res.status(200).json(voteRocord);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
};

const getAllCandidates = async (req, res) => {

    try {
        const candidates = await Candidate.find({}, 'name party voteCount -_id');

        

        res.status(200).json(candidates);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
}


module.exports = {
    castingvote,
    voteCount,
    getAllCandidates
}