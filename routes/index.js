const router = require('express').Router();

const librarianRouter = require('./librarians');
const userRouter = require('./users');
const categoryRouter = require('./categories');
const bookRouter = require('./books');

router.use('/librarians', librarianRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/books', bookRouter)

module.exports = router