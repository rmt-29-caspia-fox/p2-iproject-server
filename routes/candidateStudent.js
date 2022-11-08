const Candidate = require('../controllers/candidate');

const route = require('express').Router();


route.post('/candidate/register', Candidate.registerCandidate)
route.put('/candidate/update', Candidate.updateCandidate)

module.exports = route