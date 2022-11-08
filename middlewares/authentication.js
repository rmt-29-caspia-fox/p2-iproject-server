const { decode } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: `invalid_token` };
    }

    const payload = decode(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "invalid_token" };
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
