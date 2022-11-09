const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_CREDENTIAL
const SALT = 10

function hashedPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, SALT)
  return hashedPassword
}

function comparePassword(password, hashedPassword){
  return bcrypt.compareSync(password, hashedPassword)
}

function signedToken(payload) {
  return jwt.sign(payload, SECRET)
}

function verifyToken(token){
  return jwt.verify(token, SECRET)
}

module.exports = {
  hashedPassword, 
  comparePassword,
  signedToken,
  verifyToken
}