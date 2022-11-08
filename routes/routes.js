const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const authentication = require('../middleware/authentication');

router.post('/register', User.Register);
router.post('/google-sign-in', User.Google);
router.post('/login', User.Login);
// router.use('/pub', pub);
// router.use('/genres', genres);
// router.use(authentication);
// router.get('/profile', User.getProfile);
// router.use('/movies', movies);


module.exports = router;
