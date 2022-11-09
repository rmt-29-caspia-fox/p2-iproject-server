const CustomerController = require('../controllers/customerController')
const router = require('express').Router()

//=> /customers/....
router.post('/register',CustomerController.register)
router.post('/waitinglists/:customerid',CustomerController.addWaitingList)
router.post('/mailer', CustomerController.mailer)

module.exports = router