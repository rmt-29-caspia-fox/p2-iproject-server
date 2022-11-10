const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.getProducts)
router.post('/', ProductController.addProduct)
router.delete('/:id', ProductController.deleteProduct)
router.put('/:id', ProductController.updateProduct)

module.exports = router