const bcrypt = require("bcryptjs");

function hash(password) {
  const hashedPassword = bcrypt.hashSync(password, 8);
  return hashedPassword;
}

function compare(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hash, compare };
