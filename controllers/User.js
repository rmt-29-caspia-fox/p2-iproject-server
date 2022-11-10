const { decodePassword } = require('../helpers/bcrypt');
const { encodeToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const DiscordOauth2 = require('discord-oauth2')
const axios = require('axios');


class Users {
  static async Register(req, res, next) {
    const { username, email, password, phoneNumber } = req.body
    try {
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
    const { google_token } = req.headers
    let access_token;
    try {
      const client = new OAuth2Client({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: "https://dbuilder-iproject.web.app"
      })

      let { tokens } = await client.getToken(google_token)
      client.setCredentials({
        access_token: tokens.access_token
      })
      const userinfo = await client.request({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo'
      })
      let user;
      [user] = await User.findOrCreate({
        where: {
          email: userinfo.data.email
        },
        defaults: {
          username: userinfo.data.given_name,
          email: userinfo.data.email,
          password: 'google_auth',
        },
        hooks: false
      })
      access_token = encodeToken({
        id: user.id
      })
      res.status(200).json({ message: "Login OK", access_token })
    } catch (err) {
      next(err);
    }
  }

  static async Discord(req, res, next) {
    const { username, email } = req.query
    let user;
    try {
      [user] = await User.findOrCreate({
        where: {
          email: email
        },
        defaults: {
          username: username,
          email: email,
          password: 'discord_auth'
        },
        hooks: false
      })
      const access_token = encodeToken({
        id: user.id
      })
      res.status(200).json({ access_token: access_token })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = Users;