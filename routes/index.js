const router = require('express').Router();

const librarianRouter = require('./librarians');
const userRouter = require('./users');
const categoryRouter = require('./categories');
const authentication = require('../middlewares/authentication');

router.use('/librarians', librarianRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)

module.exports = router