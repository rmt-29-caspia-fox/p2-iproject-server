const BookController = require('../controller/book');
const Authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.get('/', BookController.getAllBooks)
router.get('/:id')

router.use(Authentication.librarian)
router.post('/', BookController.addBook)
// router.post('/:id')
// router.delete('/:id')
// router.update('/:id')

module.exports = router