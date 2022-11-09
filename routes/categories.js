const CategoryController = require('../controller/categories');
const Authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.get("/", CategoryController.findAllCategories);

router.use(Authentication.librarian)

router.post("/", CategoryController.newCategory);
router.get("/:id", CategoryController.findCategoryById)
router.delete("/:id", CategoryController.deleteCategory);
router.put("/:id", CategoryController.editCategory);
module.exports = router