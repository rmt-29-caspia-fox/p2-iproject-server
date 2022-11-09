const UserController = require('../controllers/user');

const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/sign-google',UserController.googleSign)
router.post('/sign-facebook',UserController.facebookSign)

module.exports = router