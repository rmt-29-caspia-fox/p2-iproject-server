const CustomerController = require('../controllers/customerController')
const router = require('express').Router()

//=> /customer/
router.post('/register',CustomerController.register)
router.post('/waitinglists/:customerid',CustomerController.addWaitingList)

module.exports = router