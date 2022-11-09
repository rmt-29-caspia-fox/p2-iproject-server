const router = require('express').Router();

const librarianRouter = require('./librarians');
const authentication = require('../middlewares/authentication');

router.use('/librarians', librarianRouter)

module.exports = router