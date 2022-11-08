const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
// const secret = 'junanda'

const encode = (payload) => {
  return jwt.sign(payload, secret);
};

const decode = (token) => {
  return jwt.verify(token, secret);
};


module.exports = {
	encode,
	decode
}