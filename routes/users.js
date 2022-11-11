const UserController = require('../controller/users');
const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router