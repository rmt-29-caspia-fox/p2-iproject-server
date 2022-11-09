const FavControl = require('../controllers/favorite');
const route = require('express').Router();


route.post('/:heroId', FavControl.addFav)

module.exports = route