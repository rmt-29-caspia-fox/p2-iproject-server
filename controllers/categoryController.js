const {Category} = require('../models')

class CategoryController{
  static async getCategories(req, res, next){
    try {
      const options = {}
      options.order= [['id', 'ASC']]
      const categories = await Category.findAll(options)
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }
  
  static async addCategory(req, res, next){
    try {
      const {name} = req.body
      const category = await Category.create({name})
      res.status(201).json(category)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCategory(req, res, next){
    try{
      const {id} = req.params
      const category = await Category.findByPk(id)
      if (!category) {
        throw { name: "category_not_found" };
      }
      await Category.destroy({
        where : {
          id : id
        }
      })
      res.status(200).json({message: `category "${category.name}" success to delete`})
    } catch(error){
      next(error)
    }
  }

  static async updateCategory(req, res, next){
    try{
      const {id} = req.params
      const {name} = req.body
      const findCategory = await Category.findByPk(id)
      if (!findCategory) {
        throw { name: "category_not_found" };
      }
      await Category.update({name}, {
        where : {
          id : findCategory.id
        }
      })
      res.status(200).json({message: `category "${findCategory.name}" updated to "${name}"`})
    } catch(err){
      next(err)
    }
  }
}

module.exports = CategoryController