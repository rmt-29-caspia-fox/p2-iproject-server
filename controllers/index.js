const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");

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
      const CLIENT_ID =
        "520817930211-gca4lbhljg4gguj40k363qj0gup872n5.apps.googleusercontent.com";
      const google_token = req.headers.google_token;
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      if(!ticket){
        throw {name:"google-signin-error"}
      }
      const scope = "https://www.googleapis.com/auth/books";
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/userinfo.profile",
      });
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
          maxResults,
          langRestrict: "en",
          // filter:"free-ebooks",
          startIndex,
        },
      });
      // console.log(data.items);

      for (let i = 0; i < data.items.length; i++) {
        const title = data.items[i].volumeInfo.title;
        if (title) {
          title.toLowerCase().split(" ").join("%20");
          const response = await axios({
            method: "get",
            url: "https://gutendex.com/books",
            params: {
              search: title,
            },
          });
          if (response.data.count > 0) {
            data.items[i].volumeInfo.gutenberg = response.data.results[0];
          }
        }
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
