const { User } = require("../models");

class UserController {
  static async userLogin(req, res, next) {
    try {
      res.send("ok masuk login");
    } catch (error) {
      res.send(error);
    }
  }

  static async userRegister(req, res, next) {
    try {
      const { userName, email, password, phoneNumber } = req.body;

      const users = await User.findAll();

      const userEmail = await users.find((u) => u.email === email);

      if (!userEmail) {
        const newUser = await User.create({
          userName,
          email,
          password,
          phoneNumber,
        });

        res.status(201).json({ id: newUser.id, email: newUser.email });
      } else {
        throw { name: `UserEmailRegistered` };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
