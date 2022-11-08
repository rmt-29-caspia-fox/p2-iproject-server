const jwt = require("jsonwebtoken");
const privateKey = process.env.private_key;

function decodeJwt(payload){
  return jwt.sign(payload,privateKey);
}
function compareJwt(access_token){
  return jwt.verify(access_token,privateKey);
}

module.exports = {
  decodeJwt, compareJwt
}