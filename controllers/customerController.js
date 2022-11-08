const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Bookmark } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

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

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      console.log(google_token, "<< google token");

      const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
      const client = new OAuth2Client(CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      console.log(payload, "<< payload google");

      const [customer, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          username: payload.given_name + "_" + payload.family_name,
          password: "google_oauth",
        },
        hooks: false,
      });
      const access_token = createToken({ id: customer.id });

      res.status(200).json({
        message: "ok",
        access_token,
        username: customer.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMangas(req, res, next) {
    //
    try {
      const result = await axios({
        method: `GET`,
        url: `https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=0&sort=-favoritesCount`,
      });
      // console.log(result, "<<< res");  <<< error
      console.log(result.data, "<<< res data"); // << 20 obj mangas

      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
