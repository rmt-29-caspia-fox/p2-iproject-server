const errorHandler = (error, req, res, next) => {
  console.log(error)
  let code = 500;
  let message = "internal server error";

  if (error.name === "SequelizeValidationError") {
    code = 400;
    message = error.errors[0].message;
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    code = 400;
    message = `${error.errors[0].path} already used!`
  } else if (error.name === "invalid_token" || error.name === "JsonWebTokenError") {
    code = 401;
    message = "invalid token";
  } else if(error.name === "invalid_username_or_password") {
    code = 400;
    message = "invalid username or password";
  }else if (error.name === "user_not_authorized") {
    code = 403;
    message = "User not authorized";
  } else if (error.name === "book_not_found") {
    code = 404;
    message = error.message;
  } else if (error.name === "category_not_found") {
    code = 404;
    message = error.message;
  } else if (error.name === "SequelizeForeignKeyConstraintError") {
    code = 404
    message = "can't add book to wishlist -- book not found"
  } else if (error.name === "email_required") {
    code = 400
    message = "email required"
  } else if (error.name === "password_required") {
    code = 400
    message = "password required"
  } else if (error.name === 'out_of_stock') {
    code = 400
    message = "book is out of stock!"
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
