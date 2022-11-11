const { Category } = require('../models');

module.exports = class CategoryController {
  static async findAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
  static async findCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (category) res.status(200).json(category);
      else {
        throw {
          name: "category_not_found",
          message: `category with id ${id} not found`,
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async newCategory(req, res, next) {
    try {
      const { name } = req.body;
      await Category.create({ name });
      res
        .status(201)
        .json({ message: `category "${name}" successfully created` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    const id = req.params.id;
    try {
      await Category.destroy({ where: { id: id } });
      res
        .status(200)
        .json({ message: `Category with id ${id} deleted succesfully` });
    } catch (error) {
      next(error);
    }
  }
  static async editCategory(req, res, next) {
    const { name } = req.body;
    const id = req.params.id;
    try {
      await Category.update({ name }, { where: { id } });
      res.status(200).json({ message: `category with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  }
}