

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
    }
    
    res.status(code).json({message})
  }
}

module.exports = Middleware