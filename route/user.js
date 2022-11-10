const route = require('express').Router();
const UserControl = require('../controllers/user');

route.post('/register', UserControl.register);
route.post('/login', UserControl.login);
route.post('/sign-in', UserControl.gSign)
route.get('/all', UserControl.allUser)

module.exports = route;
