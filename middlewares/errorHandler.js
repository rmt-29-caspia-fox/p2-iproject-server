const errorHandler = (err, req, res, next) => {
    let code = 500;
    let message = "ISE";
    if (err.name == "invalid_token" || err.name == "JsonWebTokenError") {
      code = 401;
      message = "Invalid Token";
    } else if (err.name == "invalidLogin") {
      code = 401;
      message = "error invalid username or email or password";
    } else if (err.name == "SequelizeValidationError") {
      code = 400;
      message = err.errors[0].message;
    } else if (err.name == "not_found") {
      code = 404;
      message = "Not found!";
    } else if (err.name == "forbidden") {
      code = 403;
      message = "Forbidden!";
    } else if (err.name == "SequelizeUniqueConstraintError"){
      code = 400;
      message = "Email already exists!";
    } else if(err.name == "existed"){
      code = 400;
      message = "Movie already in wishlist!";
    }else if(err.name == "Image must be uploaded"){
      code = 400;
      message = "Image must be uploaded!";
    }
  
    res.status(code).json({ message });
  };
  
  module.exports = {
    errorHandler,
  };
  