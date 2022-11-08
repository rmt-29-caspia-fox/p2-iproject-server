const bcrypt = require('bcryptjs')

function hashedPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, 10)
  return hashedPassword
}

function comparePassword(password, hashedPassword){
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {hashedPassword, comparePassword}