const FavControl = require('../controllers/favorite');
const author = require('../middleware/authorization');
const route = require('express').Router();

route.get('/', FavControl.getFav);
route.post('/:heroId', FavControl.addFav);
route.delete('/:id', author, FavControl.deleteFav);

module.exports = route;
