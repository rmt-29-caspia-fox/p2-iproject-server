const { comparePassword } = require("../helper/bcrypt");
const { encode } = require("../helper/jwt");
const { User } = require("../models");

class UserController {
  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "InvalidLogin" };
      }

      if (!comparePassword(password, user.password)) {
        throw { name: "InvalidLogin" };
      }

      const payload = {
        id: user.id,
      };

      const access_token = encode(payload);
 
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async userRegister(req, res, next) {
    try {
      const { userName, email, password, phoneNumber } = req.body;

      if (!userName) {
        return res.status(400).json({ message: "Username cannot empty" });
      }

      if (!email) {
        return res.status(400).json({ message: "Email cannot empty" });
      }

      if (!password) {
        return res.status(400).json({ message: "Password cannot empty" });
      }

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
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
