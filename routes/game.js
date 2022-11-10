const router = require('express').Router()
const GameController = require('../controllers/GameController')

router.get('/', GameController.getGames)


module.exports = router