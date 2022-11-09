const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const { User } = require("../models");
const keys = require("../client_secret_520817930211-gca4lbhljg4gguj40k363qj0gup872n5.apps.googleusercontent.com.json");



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
  static async googleLogin(req, res, next) {
    try {
      // console.log("masuk login google");
      const keys = require("../client_secret_520817930211-gca4lbhljg4gguj40k363qj0gup872n5.apps.googleusercontent.com.json");
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
      const total = { googleBooks:data, gutenberg: response.data };

      res.status(200).json(total);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
