function errorHandler(error, req, res, next) {
  const code = 500;
  const msg = "Internal Server Error";
  console.log(error);

  if (error.name === "google-signin-error") {
    code = 400;
    msg = "Google Sign-In Error";
  }
  res.status(code).json({ message: msg });
}

module.exports = errorHandler;
