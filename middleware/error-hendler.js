const errors = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = ' Internal server errors';

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    code = 401;
    message = err.errors[0].message;
  } else if (err.name === 'invalidLogin') {
    code = 401;
    message = 'Invalid email/password';
  } else if (err.name === 'invalidToken' || err.name === 'JsonWebTokenError') {
    code = 401;
    message = 'Invalid token';
  } else if (err.name === 'forbidden') {
    code = 403;
    message = 'Your not authorize';
  } else if (err.name === 'notFound') {
    code = 404;
    message = 'Data not found';
  }

  res.status(code).json({ message });
};

module.exports = errors;
