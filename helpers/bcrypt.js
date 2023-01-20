const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(8);

function decodeBcrypt(password){
  return bcrypt.hashSync(password, salt);
}
function compareBcrypt(password, truePass) {
  return bcrypt.compareSync(password, truePass);
}
const NPH='ate'
module.exports = {
  decodeBcrypt , compareBcrypt
}