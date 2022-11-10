const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

function signToken(id) {
  return jwt.sign({ id }, secretKey);
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
    signToken,
    verifyToken
}