const LibrarianController = require('../controller/librarian');
const router = require('express').Router();

router.post('/register', LibrarianController.register)
router.post('/login', LibrarianController.login)

module.exports = router