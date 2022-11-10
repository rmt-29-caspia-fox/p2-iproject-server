const { Product } = require("../models")

class ProductController {
  static async getProducts(req, res, next){
    try {
      const products = await Product.findAll({
        order: [['id', 'ASC']]
      })
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
  static async addProduct(req, res, next){
    try {
      const UserId = req.user.id
      const {name, description, price, imgUrl, CategoryId} = req.body
      const product = await Product.create({name, description, price, imgUrl, CategoryId, UserId})
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }
  static async deleteProduct(req, res, next){
    try {
      const {id} = req.params
      const productFind = await Product.findOne({where:{id}})
      if(!productFind){
        throw {name: "product_not_found"}
      }
      const product = await Product.destroy({where:{id}})
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }
  static async updateProduct(req, res, next){
    try {
      const {id} = req.params
      const productFind = await Product.findOne({where:{id}})
      if(!productFind){
        throw {name: "product_not_found"}
      }
      const {name, description, price, imgUrl, CategoryId} = req.body
      const product = await Product.update({name, description, price, imgUrl, CategoryId},{where:{id}})
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }
  static async getProductDetail(req, res, next){
    try {
      const {id} = req.params
      const product = await Product.findByPk(id)
      if (!product) {
        throw { name: "Product not found" };
      }
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController