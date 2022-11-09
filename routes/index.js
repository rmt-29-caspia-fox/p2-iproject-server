const router = require('express').Router();

const librarianRouter = require('./librarians');
const userRouter = require('./users');
const authentication = require('../middlewares/authentication');

router.use('/librarians', librarianRouter)
router.use('/user', userRouter)

module.exports = router