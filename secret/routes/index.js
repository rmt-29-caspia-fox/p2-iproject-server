const route = require('express').Router();
const user = require('./user');
const candidate = require('./candidateStudent');
const school = require('./school');
const authentication = require('../middleware/authentication');

route.use('/users', user)
route.use('/school', school)
route.use(authentication)

route.use('/candidate', candidate)

module.exports = route