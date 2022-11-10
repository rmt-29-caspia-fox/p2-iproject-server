const errorHandler = (err, req, res, next) => {
  console.log(err, "<<< error");
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
    // res.status(400).json({ message: error.errors[0].message });
    // error.errors[0].map((el) => el.message)
  } else if (err.name === "Invalid_credentials") {
    code = 401;
    message = "Invalid email or password";
  } else if (err.name === "no email") {
    code = 400;
    message = "Email is required";
  } else if (err.name === "no password") {
    code = 400;
    message = "Password is required";
  } else if (err.name === "manga not found") {
    code = 400;
    message = "Manga not found";
  } else if (err.name === "invalid token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (err.name === "bookmarks not found") {
    code = 404;
    message = "Bookmarks is empty";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
