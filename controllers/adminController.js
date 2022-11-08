const { comparingPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Admin } = require("../models");

class AdminController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const data = await Admin.create({ username, email, password });
      res.status(201).json({ id: data.id, email: data.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "email_required" };
      }
      if (!password) {
        throw { name: "password_required" };
      }

      const data = await Admin.findOne({ where: { email } });
      if (!data) {
        throw { name: "invalidLogin" };
      }
      if (!comparingPassword(password, data.password)) {
        throw { name: "invalidLogin" };
      }

      const access_token = signToken(data.id);
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
