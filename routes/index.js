const router = require('express').Router();

const librarianRouter = require('./librarians');
const userRouter = require('./users');
const categoryRouter = require('./categories');
const bookRouter = require('./books');
const circulationRouter = require('./circulation');

router.use('/librarians', librarianRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/books', bookRouter)
router.use('/circulations', circulationRouter)

module.exports = router