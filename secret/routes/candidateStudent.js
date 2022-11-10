const Candidate = require('../controllers/candidate');

const route = require('express').Router();


route.post('/register', Candidate.registerCandidate)
route.put('/update', Candidate.updateCandidate)

module.exports = route