const errors = (err, req, res, next) => {
  let code = 500;
  let message = 'Internal server error';

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    code = 400
    message = err.errors[0].message
  } else if(err.name = 'invalidLogin'){
    code = 404
    message = 'Wrong email/password'
  }

  res.status(code).json({message})
};

module.exports = errors