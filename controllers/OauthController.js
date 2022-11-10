const { encode } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");

class GoogleLogin {
  static async userGoogleLogin(req, res, next) {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const google_token = req.headers.google_token;
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_ID,
      });
			console.log(ticket);
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
					userName: 'google-login',
          email: payload.email,
          password: "google-oauth",
        },
        hooks: false,
      });

      const access_token = encode({
        id: user.id,
      });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GoogleLogin;
