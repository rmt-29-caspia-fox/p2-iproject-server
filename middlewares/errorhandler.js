function errorHandler(error, req, res, next) {
  const code = 500;
  const msg = "Internal Server Error";
  console.log(error);

  if (error.name === "google-signin-error") {
    code = 400;
    msg = "Google Sign-In Error";
  } else if (error.name === "invalidLogin") {
    code = 400;
    msg = "Invalid email / password";
  } else if (
    error.name === "InvalidToken" ||
    error.name === "JsonWebTokenError"
  ) {
    code = 401;
    msg = "Invalid token";
  } else if (error.name === "NotFound") {
    code = 404;
    msg = "Favourite not found!";
  } else if (error.name === "unauthorized") {
    code = 403;
    msg = "You are unauthorized!";
  }
  res.status(code).json({ message: msg });
}

module.exports = errorHandler;
