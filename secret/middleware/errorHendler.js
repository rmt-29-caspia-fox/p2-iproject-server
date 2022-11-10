const errors = (err, req, res, next) => {
  console.log(err.name);
  let code = 500;
  let message = 'Internal server error';

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    code = 400
    message = err.errors[0].message
  } else if(err.name === 'invalidLogin'){
    code = 401
    message = 'Wrong email/password'
  } else if(err.name === 'dataNotFound'){
    code = 404
    message = 'School name not found'
  }

  res.status(code).json({message})
};

module.exports = errors