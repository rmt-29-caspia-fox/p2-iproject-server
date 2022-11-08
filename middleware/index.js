const {User} = require('../models');
const Help = require('../helpers');
const user = require('../models/user');

class Middleware{
  static async authentication(req, res, next) {
    try {
      const {access_token} = req.headers
      if(!access_token) {
        throw {name: `invalidToken`}
      }
      const payload = Help.verifyToken(access_token)
      if(!payload) {
        throw {name : `invalidToken`}
      }
      const user = await User.findByPk(payload.id)
      req.user = {
        id: user.id
      }
      next()
    } catch (err) {
      next(err)
    }
  }

  static errorHandler(err, req, res, next) {
    let code = 500
    let message = `Internal Server Error`

    if(err.name === `SequelizeValidationError` || err.name === `SequelizeUniqueConstraintError`) {
      code = 400
      message = err.errors[0].message
    } else if(err.name === `email`) {
      code = 400
      message = `Email is required`
    } else if(err.name === `password`) {
      code = 400
      message = `Password is required`
    } else if(err.name === `invalidUser`) {
      code = 401
      message = `Invalid email/password`
    } else if(err.name === `invalidToken` || err.name === `JsonWebTokenError`) {
      code = 401
      message = `Invalid Token`
    }
    
    res.status(code).json({message})
  }
}

module.exports = Middleware