const route = require('express').Router();
const UserControl = require('../controllers/user');

route.post('/register', UserControl)

module.exports = route