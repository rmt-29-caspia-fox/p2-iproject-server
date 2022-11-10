const HeroControl = require('../controllers/hero');

const route = require('express').Router();

route.get('/', HeroControl.allHero);
route.get('/role', HeroControl.getHeroByRole);
route.get('/specially', HeroControl.getHeroBySpecially);
route.get('/:id', HeroControl.getHeroById);

module.exports = route;
