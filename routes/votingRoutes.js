
const express = require('express');
const {castingvote, voteCount, getAllCandidates} = require('../controllers/votingControllers');
const {jwtAuthMiddleware} = require('../jwt');

const votingRouter = express.Router();

votingRouter.post("/:candidateID", jwtAuthMiddleware ,castingvote);
votingRouter.get("/count", voteCount);
votingRouter.get("/candidates", getAllCandidates);

module.exports = votingRouter;