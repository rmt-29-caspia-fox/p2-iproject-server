const router = require('express').Router()
const GameItemController = require('../controllers/GameItemController')

router.get('/', GameItemController.getGameItems)


module.exports = router