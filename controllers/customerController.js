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
}

module.exports = CustomerController;
