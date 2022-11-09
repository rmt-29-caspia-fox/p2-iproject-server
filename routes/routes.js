const express = require('express');
const router = express.Router();
const decks = require('./decks.js')
const User = require('../controllers/User');
const authentication = require('../middleware/authentication');

router.post('/register', User.Register);
router.post('/google-sign-in', User.Google);
router.post('/auth/discord', User.Discord);
router.post('/login', User.Login);
router.use(authentication);
router.get('/profile', User.getProfile);
router.use('/decks', decks);

module.exports = router;
