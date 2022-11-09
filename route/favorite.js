const FavControl = require('../controllers/favorite');
const route = require('express').Router();

route.get('/', FavControl.getFav)
route.post('/:heroId', FavControl.addFav)
route.delete('/:id', FavControl.deleteFav)

module.exports = route