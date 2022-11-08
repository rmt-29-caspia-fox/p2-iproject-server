const router = require('express').Router();
const news = require('./news');
const user = require('./user');
const Middleware = require('../middleware');

router.use('/', user)

// router.use(Middleware.authentication)

router.use('/pub', news)


module.exports = router