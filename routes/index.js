const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const categoriesRouter = require('./categories')
const shippingCostRouter = require('./shippingCost')
const publicRouter = require('./public')
const productsRouter = require('./products')
const authentication = require('../middleware/authentication')

router.get('/test', (req, res) => {
  res.status(200).json({message: "OK"})
})


router.use('/public', publicRouter)
router.use('/shipping-cost', shippingCostRouter)

router.use(authentication)
router.use('/users', userRouter)
router.use('/categories', categoriesRouter)
router.use('/products', productsRouter)

module.exports = router