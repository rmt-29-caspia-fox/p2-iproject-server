const {User} = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const {email,password} = req.body;
      const newUser = await User.create({email,password});
      res.status(201).json({
        id:newUser.id,
        email:newUser.email
        });
    } catch (error) {
      next(error)
    }
  }
  static async login(req, res, next) {}
}

module.exports = Controller;