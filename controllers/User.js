const { decodePassword } = require('../helpers/bcrypt');
const { encodeToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { default: axios } = require('axios');
const CLIENT_ID = process.env.CLIENT_ID

class Users {
  static async Register(req, res, next) {
    const { username, email, password, phoneNumber } = req.body
    try {
      console.log(username, email, password, phoneNumber)
      const user = await User.create({
        username, email, password, phoneNumber
      });
      delete user.dataValues.password;
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      next(error);
    }
  }

  static async Login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        throw new Error("Invalid Login");
      }
      if (!decodePassword(password, user.password)) {
        throw new Error("Invalid Login");
      }
      const payload = { id: user.id };
      const access_token = encodeToken(payload);
      res.status(200).json({ message: "Login OK", access_token })
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      let user = await User.findByPk(req.user.id, {
        attributes: ["id", "username", "email"]
      });
      res.status(200).json({ message: "User Profile", user });
    } catch (error) {
      next(error);
    }
  }

  static async Google(req, res, next) {
    try {
      const google_token = req.headers.google_token
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_ID
      });
      const payload = ticket.getPayload();
      let user;
      [user] = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: 'google_auth',
          role: "Staff",
        },
        hooks: false
      })
      const access_token = encodeToken({
        id: user.id
      })
      res.status(200).json({ message: "Login OK", access_token })
    } catch (err) {
      next(err);
    }
  }

  static async Discord(req, res, next) {
    const { code } = req.query
    try {
      const { data } = await axios({
        method: "post",
        url: "https://discord.com/api/oauth2/token",
        params: {
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: "http://localhost:3000/auth/discord"
        }
      })
      const { access_token, token_type } = data
      const userResponse = await axios({
        method: "get",
        url: 'https://discord.com/api/users/@me',
        headers: {
          authorization: `${token_type} ${access_token}`
        }
      })
      const payload = {
        username: userResponse.data.username,
        email: userResponse.data.email,
      }
      let user;
      [user] = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          username: payload.username,
          email: payload.email,
          password: 'discord_auth'
        },
        hooks: false
      })

      access_token = encodeToken({
        id: user.id
      })
      res.status(200).json({ message: "Login OK", access_token })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Users;