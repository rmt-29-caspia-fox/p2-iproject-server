const AdminController = require('../controllers/adminController')
const WaitingListController = require('../controllers/waitinglistController')
const { authentication } = require('../middleware/authentication')
const router = require('express').Router()

// => /admin/...
router.post('/register',AdminController.register)
router.post('/login',AdminController.login)
router.get('/waitinglists', WaitingListController.getWaitinglist)
router.use(authentication)
router.get('/waitinglists/:id', WaitingListController.getWaitinglistById)
router.patch('/waitinglists/:id', WaitingListController.patchWaitlist)
router.post('/mailer', AdminController.mailer)

module.exports = router