const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const CategoryController = require('../controllers/categoryController')
const ProductController = require('../controllers/productController')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/categories', CategoryController.getCategories)
router.get('/products', ProductController.getProducts)

module.exports = router
