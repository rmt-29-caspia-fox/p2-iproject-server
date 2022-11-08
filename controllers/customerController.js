const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Bookmark } = require("../models");

class CustomerController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newCustomer = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({ id: newCustomer.id, email: newCustomer.email });
    } catch (error) {
      // console.log(error, "<< error");
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "no email" };
      }

      if (!password) {
        throw { name: "no password" };
      }

      const customer = await User.findOne({
        where: { email },
      });

      if (!customer) {
        throw { name: "Invalid_credentials" };
      }

      const validPassword = compare(password, customer.password);
      if (!validPassword) {
        throw { name: "Invalid_credentials" };
      }

      const payload = { id: customer.id };
      const access_token = createToken(payload);
      // console.log(user, "<<< user");
      res.status(200).json({ access_token, username: customer.username });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
