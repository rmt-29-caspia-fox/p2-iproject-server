const errorHandler = (err, req, res, next) => {
    console.log("ini error >>>",err,"<<< ini error")
    let code = 500; 
    let msg = "Internal Server Error";
  
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
      const errors = err.errors.map((el) => el.message);
      code = 400
      msg = errors.join(',')
    }else if (err.name === "email_required") {
      code = 401
      msg = 'Email is required'
    }else if (err.name === "password_required") {
      code = 401
      msg = 'Password is required'
    }else if (err.name === "invalidToken" || err.name === "JsonWebTokenError") {
      code = 401
      msg = 'Invalid token'
    }else if (err.name === "invalidLogin") {
      code = 401
      msg = 'invalid email/password'
    }else if (err.name === "notFound") {
      code = 404
      msg = 'Item not found!'
    }else if (err.name === "forbiden") {
      code = 403
      msg = 'No authorization!'
    }else if (err.name === "InvalidNumber") {
      code = 404
      msg = 'Number is not available'
    }else if (err.name === "emailWrong") {
      code = 401
      msg = 'Error sending mail'
    }
  
    res.status(code).json({ msg });
  };
  
  module.exports = {
      errorHandler
  }