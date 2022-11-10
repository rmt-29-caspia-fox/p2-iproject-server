const { User, CandidateStudent } = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {encode} = require('../helpers/jwt');

class UserController {

  static async userRegister(req, res, next) {
    try {
        const {username, email, password, phoneNumber, address} = req.body
        const user = await User.create({username, email, password, phoneNumber, address})

        res.status(201).json({username : user.username, email: user.email})
    } catch (error) {
      next(error)
    }
  }

  static async userLogin(req, res, next) {
    try {
      const {email, password} = req.body
      if(!email || !password){
        throw {name: 'invalidLogin'}
      }
      const user = await User.findOne({where: {email}})
      if(!user){
        throw {name: 'invalidLogin'}
      }
      const compare = comparePassword(password, user.password)
      if(!compare){
        throw {name: 'invalidLogin'}
      }
      const access_token = encode({id:user.id})
      res.status(200).json({access_token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;
