const { comparePw, encodeToken } = require("../helpers");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const ImageKit = require("imagekit");
const fs = require("fs");
// const DiscordOauth2 = require("discord-oauth2");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const profilePic = "-";
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
      res
        .status(200)
        .json({ access_token, username: user.username, id: user.id });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async google(req, res, next) {
    try {
      const CLIENT_GOOGLE = process.env.CLIENT_GOOGLE;
      const google_token = req.headers.google_token;
      const client = new OAuth2Client(CLIENT_GOOGLE);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_GOOGLE,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "google_oauth",
          username: payload.name,
        },
        hooks: false,
      });
      const access_token = encodeToken({
        id: user.id,
      });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  // static async discord(req, res, next) {
  //   try {
  //     const CLIENT_ID = process.env.CLIENT_ID;
  //     const CLIENT_SECRET = process.env.CLIENT_SECRET;
  //     const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  //     const oauth = new DiscordOauth2();
  //     const data = await oauth.tokenRequest({
  //       clientId: CLIENT_ID,
  //       clientSecret: CLIENT_SECRET,
  //       code: "query code",
  //       grantType: "authorization_code",
  //       redirectUri: "http://localhost:9910/discord/callback",
  //     });
  //     console.log(data);
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
  // } catch (err) {
  //   console.log(err);
  //   next(err);
  // }
  // }

  static async getProfile(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      res.status(200).json({ profilePic: user.profilePic });
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.file, "<< req.file <<");
      if (!req.file) {
        throw { name: "Image must be uploaded" };
      }
      let newUrl = "";
      const imagekit = new ImageKit({
        publicKey: "public_dV32LkjmtFPBB3QUri2gQ3M2Ilc=",
        privateKey: "private_QbmZScRY8vkb6ai1JXcfKqtAkTA=",
        urlEndpoint: "https://ik.imagekit.io/jon012",
      });
      fs.readFile(
        `./${req.file.destination}/${req.file.filename}`,
        function (err, data) {
          if (err) throw err; // Fail if the file can't be read.
          imagekit
            .upload({
              file: data, //required
              fileName: `${req.file.filename}`, //required
              tags: ["profilepic"],
            })
            .then((response) => {
              User.update({ profilePic: response.url }, { where: { id: id } });
              res
                .status(200)
                .json({ message: "Profile Pic succesfully updated" });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
