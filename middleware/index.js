

class Middleware{
  static async authentication(req, res, next) {
    try {
      
    } catch (err) {
      
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
    }
    
    res.status(code).json({message})
  }
}

module.exports = Middleware