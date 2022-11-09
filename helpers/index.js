const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let key = process.env.JWT_SECRET

class Help {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 8)
  }

  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
  }

  static generateToken(payload) {
    return jwt.sign(payload, key)
  }

  static verifyToken(token) {
    return jwt.verify(token, key)
  }
}

module.exports = Help