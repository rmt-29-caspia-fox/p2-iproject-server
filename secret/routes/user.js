const route = require('express').Router();
const UserController = require('../controllers/user');

route.post('/register', UserController.userRegister);
route.post('/login', UserController.userLogin)

module.exports = route