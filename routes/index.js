const route = require('express').Router();
const user = require('./user');
const candidate = require('./candidateStudent');
const authentication = require('../middleware/authentication');

route.use('/users', user)

route.use(authentication)

route.use('/candidateStudents', candidate)

module.exports = route