const express = require('express');
const router = express.Router();
const decks = require('./decks.js')
const User = require('../controllers/User');
const authentication = require('../middleware/authentication');
const axios = require('axios');

router.post('/register', User.Register);
router.post('/google-sign-in', User.Google);
router.post('/auth/discord', User.Discord);
router.post('/login', User.Login);
router.get('/cards', async (req, res, next) => {
  const { fname } = req.query
  try {
    const { data } = await axios({
      method: "get",
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?&",
      params: {
        fname: fname
      }
    })
    data.data.forEach(element => {
      delete element.card_sets;
      delete element.banlist_info;
    });
    res.status(200).json({ message: "OK", cards: data.data })
  } catch (err) {
    next(err)
  }
})
router.use(authentication);
router.get('/profile', User.getProfile);
router.use('/decks', decks);

module.exports = router;
