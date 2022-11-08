const AdminController = require('../controllers/adminController')
const router = require('express').Router()

// => /admin/...
router.post('/register',AdminController.register)
router.post('/login',AdminController.login)

module.exports = router