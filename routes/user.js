const UserController = require('../controllers/user');

const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.post('/register', )

module.exports = router