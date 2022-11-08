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
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
