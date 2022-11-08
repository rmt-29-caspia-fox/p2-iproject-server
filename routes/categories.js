const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.getCategories)
router.post('/', CategoryController.addCategory)
router.delete('/:id', CategoryController.deleteCategory)
router.put('/:id', CategoryController.updateCategory)

module.exports = router