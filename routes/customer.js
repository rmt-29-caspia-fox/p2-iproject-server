const CustomerController = require('../controllers/customerController')
const WaitingListController = require('../controllers/waitinglistController')
const router = require('express').Router()

//=> /customers/....
router.post('/register',CustomerController.register)
router.get('/waitinglists', WaitingListController.getWaitinglistCustomer)
router.post('/waitinglists/:customerid',CustomerController.addWaitingList)

module.exports = router