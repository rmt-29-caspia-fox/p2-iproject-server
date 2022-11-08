const router = require('express').Router()
const UserController = require('../controllers/UserController')


router.post('/login', UserController.userLogin)

router.post('/register', UserController.userRegister)

router.get('/register', UserController.userRegister)






module.exports = router
