const CustomerController = require('../controllers/customerController')
const WaitingListController = require('../controllers/waitinglistController')
const router = require('express').Router()

//=> /customers/....
router.post('/register',CustomerController.register)
router.get('/waitinglists', WaitingListController.getWaitinglist)
router.post('/waitinglists/:customerid',CustomerController.addWaitingList)
router.post('/mailer', CustomerController.mailer)

module.exports = router