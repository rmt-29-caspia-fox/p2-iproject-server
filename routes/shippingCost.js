const express = require('express')
const router = express.Router()
const ShippingCostController = require('../controllers/shippingCostController')

router.post('/cost', ShippingCostController.getCost)
router.get('/province', ShippingCostController.getProvince)
router.get('/city/:provinceId', ShippingCostController.getCity)

module.exports = router