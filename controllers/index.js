const { User, Balance, Product, Subproduct } = require('../models')

const { encode, decode } = require('../helper/hashPass')

const {jwtSign, jwtVerify} = require('../helper/jwt')

class Control {
	static async postLogin(req, res, next){
		try {
			let data = req.body
			const findUser = await User.findOne({
				where: {
					email: data.email
				}
			})
		} catch (err) {
			next(err)
		}
	}

	static async postRegister(req, res, next){
		try {
			
		} catch (err) {
			next(err)
		}
	}

	static async getProducts(req, res, next){
		try {
			
		} catch (err) {
			next(err)
		}
	}

	static async getProductById(req, res, next){
		try {
			
		} catch (err) {
			next(err)
		}
	}
}

module.exports = Control