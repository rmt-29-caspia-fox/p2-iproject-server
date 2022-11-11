const { Librarian, User } = require("../models");
const { decodeToken } = require("../helpers/jwt");

module.exports = class Authentication {
  static async librarian(req, res, next) {
    try {
      const { access_token } = req.headers;
      if (!access_token) {
        throw { name: "invalid_token" };
      }
      const payload = decodeToken(access_token);
      if (!payload) {
        throw { name: "invalid_token" };
      }
  
      const user = await Librarian.findByPk(payload.id);
      if (!user) {
        throw { name: "invalid_token" };
      }
  
      req.user = { id: user.id, role: user.role };
  
      next();
    } catch (error) {
      next(error)
    }
  };

  static async user(req, res, next) {
    try {
      const { access_token } = req.headers;
      if (!access_token) {
        throw { name: "invalid_token" };
      }
      const payload = decodeToken(access_token);
      if (!payload) {
        throw { name: "invalid_token" };
      }
  
      const user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: "invalid_token" };
      }
  
      req.user = { id: user.id, role: user.role };
  
      next();
    } catch (error) {
      next(error)
    }
  };

}
