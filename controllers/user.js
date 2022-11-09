const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { encode } = require('../helpers/jwt');

class UserControl {
  static async register(req, res, next) {
    try {
      const { username, email, password , latitude, longitude} = req.body;
      const user = await User.create({ username, email, password, latitude, longitude });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: 'invalidLogin' };
      }

      const compare = comparePass(password, user.password);
      if (!compare) {
        throw { name: 'invalidLogin' };
      }

      const access_token = encode({ id: user.id, username: user.username });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async gSign(req, res, next) {
    try {
      const google_token = req.headers.google_token;
      const client = new OAuth2Client(process.env.client_id);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.client_id, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [user, create] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          username: payload.name,
          password: 'sign-in-google',
        },
        hooks: false,
      });

      const access_token = encode({ id: user.id});

      res.status(200).json({ access_token: access_token, name: user.username });
    } catch (error) {
      next(error);
    }
  }

  static async allUser(req, res, next){
    try {
      const user = await User.findAll()
      const location = user.map(el => {
        const data = {latitude: el.latitude, longitude: el.longitude}
        return data
      })
      res.status(200).json(location)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserControl;
