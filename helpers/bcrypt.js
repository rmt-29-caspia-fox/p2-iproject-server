const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(8);

function decodeBcrypt(password){
  return bcrypt.hashSync(myPlaintextPassword, salt);
}
function compareBcrypt(password, truePass) {
  return bcrypt.compareSync(password, truePass);
}

module.exports = {
  decodeBcrypt , compareBcrypt
}