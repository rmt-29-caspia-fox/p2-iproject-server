const { comparePassword } = require('../helpers/hashPassword');
const { User } = require('../models');
const { encodeToken } = require('../helpers/jwt');

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password, phoneNumber, role } = req.body
      const user = await User.create({ firstName, lastName, email, password, phoneNumber, role })
      res.status(201).json({ id: user.id, email: user.email })
    } catch (error) {
      next(error)
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email) {
        throw { name: "email_required" };
      }
      if(!password) {
        throw { name: "password_required" };
      }

      const user = await User.findOne({ where: { email } });


      if (!user) {
        throw { name: "invalid_username_or_password" };
      }

      const checkPassword = comparePassword(password, user.password);
      if (!checkPassword) {
        throw { name: "invalid_username_or_password" };
      }

      const payload = { id: user.id };
      const access_token = encodeToken(payload);

      res
        .status(200)
        .json({ access_token, email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  }
}
