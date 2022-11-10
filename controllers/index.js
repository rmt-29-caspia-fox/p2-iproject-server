const { comparePw, encodeToken } = require("../helpers");
const { User } = require("../models");
const DiscordOauth2 = require("discord-oauth2");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const profilePic = req.file.path
      const user = await User.create({ email, password, username, profilePic });
      res
        .status(201)
        .json({ id: user.id, email: user.email, username: user.username });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "invalidLogin" };
      }

      if (!comparePw(password, user.password)) {
        throw { name: "invalidLogin" };
      }

      const payload = {
        id: user.id,
      };
      const access_token = encodeToken(payload);
      res.status(200).json({ access_token, username: user.username });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async discord(req, res, next) {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const CLIENT_SECRET = process.env.CLIENT_SECRET;
      const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const oauth = new DiscordOauth2();
      const data = await oauth.tokenRequest({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        code: "query code",
        grantType: "authorization_code",
        redirectUri: "http://localhost:9910/discord/callback",
      });
      console.log(data);
      //   const payload = ticket.getPayload();

      //   const [user, created] = await User.findOrCreate({
      //     where: {
      //       email: payload.email,
      //     },
      //     defaults: {
      //       email: payload.email,
      //       password: "google_oauth",
      //       role: "Staff",
      //     },
      //     hooks: false,
      //   });
      //   let role = user.role;
      //   let staffId = user.id;
      //   const access_token = encodeToken({
      //     id: user.id,
      //     role: user.role,
      //   });
      //   let userEmail = payload.email;
      //   res.status(200).json({ access_token, userEmail, role, staffId });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { profilePic } = req.body;
      await User.update({ profilePic }, { where: { id: id } });
      res.status(200).json({message: "Profile Pic succesfully updated"})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller;
