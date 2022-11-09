const { comparePassword } = require('../helpers/hashPassword');
const { Librarian } = require('../models');
const { encodeToken } = require('../helpers/jwt');

module.exports = class LibrarianController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password, phoneNumber, role } = req.body
      const librarian = await Librarian.create({ firstName, lastName, email, password, phoneNumber, role })
      res.status(201).json({ id: librarian.id, email: librarian.email })
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

      const librarian = await Librarian.findOne({ where: { email } });


      if (!librarian) {
        throw { name: "invalid_username_or_password" };
      }

      const checkPassword = comparePassword(password, librarian.password);
      if (!checkPassword) {
        throw { name: "invalid_username_or_password" };
      }

      const payload = { id: librarian.id };
      const access_token = encodeToken(payload);

      res
        .status(200)
        .json({ access_token, email: librarian.email, role: librarian.role });
    } catch (error) {
      next(error);
    }
  }
}
