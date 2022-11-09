const route = require('express').Router();
const favorite = require('./favorite');
const user = require('./user');
const hero = require('./hero');
const authen = require('../middleware/authentication');

route.use('/users', user);
route.use('/heroes', hero);
route.use(authen);
route.use('/favorites', favorite);

module.exports = route;
