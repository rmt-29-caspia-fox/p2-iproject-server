const router = require('express').Router();
const NewsController = require('../controllers/news');
router.get('/', NewsController.data)
router.get('/news', NewsController.news)
router.get('/country', NewsController.country)

module.exports = router