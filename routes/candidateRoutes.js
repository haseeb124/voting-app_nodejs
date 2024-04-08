const express = require('express');
const {newCandidate, updateCandidate, deleteCandidate} = require('../controllers/candidateControllers');
const {candidateValidation} = require('../candidateValidation');
const candidateRouter = express.Router();

candidateRouter.post("/", candidateValidation() , newCandidate);
candidateRouter.put("/:candidateID", candidateValidation() ,updateCandidate);
candidateRouter.delete("/:candidateID", deleteCandidate);



module.exports = candidateRouter;