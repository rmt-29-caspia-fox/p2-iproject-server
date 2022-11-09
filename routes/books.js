const BookController = require('../controller/book');
const Authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.get('/', BookController.getAllBooks)
router.get('/:id', BookController.getBookById)

router.use(Authentication.librarian)
router.post('/', BookController.addBook)
router.delete('/:id', BookController.deleteBookById)
router.put('/:id', BookController.updateBookById)

module.exports = router