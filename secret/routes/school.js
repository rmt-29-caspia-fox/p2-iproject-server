const route = require('express').Router();
const School = require('../controllers/school')

route.get('/', School.allSchool)
route.get('/:type', School.searchSchool)

module.exports = route