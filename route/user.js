const route = require('express').Router();
const UserControl = require('../controllers/user');

route.post('/register', UserControl.register)
route.post('/login', UserControl.login)

module.exports = route