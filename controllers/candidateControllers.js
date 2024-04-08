
const Candidate = require('../models/candidateModel');
const User = require('../models/userModel');

const checkAdmin = async(userID) => {

    try {
        const user = await User.findById(userID);
        if(user.role === 'admin'){
            return true;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};


const newCandidate = async(req, res) => {

        try {
            if(!(await checkAdmin(req.user.id))){
                return res.status(401).json({message: "user does not have admin role"})
            }
    
            const data = req.body;
    
            const newcandidate = new Candidate(data);
    
            const response = await newcandidate.save();
            res.status(201).json({response: response});
        } catch (error) {
            console.log(error);
            
        }
};

const updateCandidate = async (req, res) => {
        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body;

        try {

            if(!(await checkAdmin(req.user.id))){
                return res.status(401).json({message: "user does not have admin role"})
            }


            const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData)

            if(!response) {
                return res.status(404).json({message: "candiate not found"})
            }
            res.status(200).json(response);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "internal server error"})

        }
};

const deleteCandidate = async (req, res) => {

    const candidateID = req.params.candidateID;

    try {

        if(!(await checkAdmin(req.user.id))){
            return res.status(401).json({message: "user does not have admin role"})
        }


        const response = await Candidate.findByIdAndDelete(candidateID)

        if(!response) {
            return res.status(404).json({message: "candiate not found"})
        }
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
    }
};






module.exports = {
    newCandidate,
    updateCandidate,
    deleteCandidate,
}