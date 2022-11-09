const { Admin, Customer } = require("../models");
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    const payload = verifyToken(access_token);

    const admin = await Admin.findByPk(payload.id);
    if (!admin) {
      throw { name: "invalidToken" };
    }

    req.user = { id: admin.id, email: admin.email};
    next()
  } catch (err) {
    next(err);
  }
};


module.exports = {
  authentication,
};