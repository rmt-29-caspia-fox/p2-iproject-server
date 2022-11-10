const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const CategoryController = require('../controllers/categoryController')
const ProductController = require('../controllers/productController')

router.post('/login', UserController.login)
router.post('/login-google', UserController.googleSignIn)
router.post('/register', UserController.register)
router.get('/categories', CategoryController.getCategories)
router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProductDetail)

module.exports = router
