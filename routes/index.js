const router = require('express').Router()

const Control = require('../controllers')

router.post('/login', Control.postLogin)
router.post('/register', Control.postLogin)
router.post('/products', Control.postLogin)
router.post('/product/:id', Control.postLogin)

module.exports = router