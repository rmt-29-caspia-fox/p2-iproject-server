const {User} = require("../models");

function authenthication(req, res, next) {
  try {
    next();
  } catch (error) {
    next(error);
  }
}
function authorization(req, res, next) {
  try {
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenthication , authorization
}
