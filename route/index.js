const route = require('express').Router()
const favorite = require('./favorite');
const user = require('./user');

route.use('/users', user)
route.use('/favorites', favorite)

module.exports = route