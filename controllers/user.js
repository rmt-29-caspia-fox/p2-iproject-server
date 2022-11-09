const { User } = require('../models');
const {comparePass} = require('../helpers/bcrypt');
const {encode} = require('../helpers/jwt');

class UserControl {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password })
      res.status(201).json({id: user.id, email: user.email})
    } catch (err) {
        next(err)
    }
  }

  static async login(req, res, next) {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if(!user){
            throw {name: 'invalidLogin'}
        }

        const compare = comparePass(password, user.password)
        if(!compare){
            throw {name: 'invalidLogin'}
        }

        const access_token = encode({id: user.id, username: user.username})
        res.status(200).json({access_token})
    } catch (err) {
        next(err)
    }
  }
}

module.exports = UserControl;
