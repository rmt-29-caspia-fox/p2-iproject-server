const bcrypt = require('bcryptjs');

const hashPassword = (plain) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plain, salt);
  return hash
}

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword); 
}

module.exports = { hashPassword, comparePassword }