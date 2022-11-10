const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const { User, Favourite } = require("../models");
const keys = require("../client_secret_520817930211-gca4lbhljg4gguj40k363qj0gup872n5.apps.googleusercontent.com.json");
const { compareBcrypt } = require("../helpers/bcrypt");
const { decodeJwt } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({ email, password });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "invalidLogin" };
      }
      if (compareBcrypt(password, user.password)) {
        const payload = { id: user.id };
        const access_token = decodeJwt(payload);
        res.status(200).json({ access_token });
      }
    } catch (error) {
      next(error);
    }
  }
  static async postFav(req, res, next) {
    try {
      const UserId = req.user.id;
      const { title, googleId, author, imageUrl } = req.body;
      const options = {};
      if (!googleId) {
        options.googleId = googleId;
      } else {
        options.title = title;
      }
      const [newFav, created] = await Favourite.findOrCreate({
        where: options,
        defaults: {
          title,
          googleId,
          author,
          imageUrl,
          UserId,
        },
      });
      if (created) {
        res.status(201).json(newFav);
      } else {
        res.status(200).json(newFav);
      }
    } catch (error) {
      next(error);
    }
  }
  static async getFav(req, res, next) {
    try {
      const UserId = req.user.id;
      const favData = await Favourite.findAll({
        where: { UserId },
      });
      res.status(200).json(favData);
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      // console.log("masuk login google");
      
      const CLIENT_ID = keys.web.client_id;
      const google_token = req.headers.google_token;
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_ID,
      });
      if (!ticket) {
        throw { name: "google-signin-error" };
      }
      console.log(ticket.getPayload().email);
      const email = ticket.getPayload().email;
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: "google123",
        },
        hooks: false,
      });
      const access_token = decodeJwt({ id: user.id });
      if (created) {
        return res.status(201).json({ access_token: access_token });
      } else {
        return res.status(200).json({ access_token: access_token });
      }
      // const scope = "https://www.googleapis.com/auth/books";
      // const authorizeUrl = ticket.generateAuthUrl({
      //   access_type: "offline",
      //   scope,
      // });
      // console.log(authorizeUrl);

      // const payload = ticket.getPayload();
      // console.log(ticket);
      // res.status(200).json(payload)
      // const email = payload.email;
      // let [user, created] = await Customer.findOrCreate({
      //   where: { email },
      //   defaults: {
      //     email,
      //     password: "google123",
      //   },
      //   hooks: false,
      // });
      // const access_token = jwtEncode({ id: user.id });
      // if (created) {
      //   return res.status(201).json({ access_token: access_token });
      // } else {
      //   return res.status(200).json({ access_token: access_token });
      // }
    } catch (error) {
      next(error);
    }
  }

  static async constentPage(req, res, next) {
    try {
      const keys = require("../client_secret_520817930211-gca4lbhljg4gguj40k363qj0gup872n5.apps.googleusercontent.com.json");
      const oauth2Client = new google.auth.OAuth2(
        keys.web.client_id,
        keys.web.client_secret,
        "http://localhost:3000/oauth2callback"
      );
      const scopes = ["https://www.googleapis.com/auth/books"];
      const authorizationUrl = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "offline",
        /** Pass in the scopes array defined above.
         * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
        scope: scopes,
        // Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes: true,
      });
      console.log(authorizationUrl);
      res.status(200).json({ Location: authorizationUrl });
      // res.status(301).json({ Location: authorizationUrl });
    } catch (error) {
      next(error);
    }
  }
  static async gSearch(req, res, next) {
    try {
      const { query, pageNum } = req.body;
      let startIndex = 0;
      if (pageNum) {
        startIndex = (+pageNum - 1) * 10;
      }
      const maxResults = 3;
      const key = "";
      const arrQ = query.split(" ").join("+");

      const { data } = await axios({
        method: "get",
        url: `https://www.googleapis.com/books/v1/volumes`,
        params: {
          q: arrQ,
          // maxResults,
          langRestrict: "en",
          // filter:"free-ebooks",
          startIndex,
        },
      });
      // console.log(data.items);
      const title = query.toLowerCase().split(" ").join("%20");
      // console.log(title, "<<<RESPONSE");
      const response = await axios({
        method: "get",
        url: "https://gutendex.com/books",
        params: {
          search: title,
        },
      });
      // console.log(response.data, "<<<RESPONSE");
      const total = { googleBooks: data, gutenberg: response.data };

      res.status(200).json(total);
    } catch (error) {
      next(error);
    }
  }
  static async editFav(req,res,next){
    try {
      const UserId = req.user.id;
      const favId = req.params.id;
      const {review,shortDesc} = req.body;
      const oneFav = await Favourite.findOne({
        where: { id: favId },
      });
      if (!oneFav) {
        throw { name: "NotFound" };
      };
      if (oneFav.UserId !== UserId) {
        throw { name: "unauthorized" };
      }
      oneFav.set({
        review,
        shortDesc,
      });
      await oneFav.save();
      res.status(200).json({ message: "Your review has been added!" });
    } catch (error) {
      next(error);
    }
  }
  static async delFav(req,res,next){
    try {
      const UserId = req.user.id;
      const favId = req.params.id;
      await Favourite.destroy({
        where: { id:favId },
      });
      res.status(200).json({ message: "Your favourite has been destroyed!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
