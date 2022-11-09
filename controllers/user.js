const {User} = require('../models');
const Help = require('../helpers');
const {OAuth2Client} = require('google-auth-library');

class UserController{
  static async register(req, res, next) {
    try {
      const {username, email, password }  = req.body
      const user = await User.create({
        email: email,
        password: password,
        username: username
      })
      res.status(201).json({message: `success created account with email : ${user.email}`})
    } catch (err) {
      next(err)
    }
  }
  
  static async login(req, res, next) {
    try {
      const {email, password} = req.body
      if(!email) {
        throw {name: `email`}
      }
      if(!password) {
        throw {name: `password`}
      }
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if(!user) {
        throw {name: `invalidUser`}
      }
      const validate = Help.comparePassword(password, user.password)

      if(!validate) {
        throw {name: `invalidUser`}
      }
      const payload = {
        id: user.id
      }
      const access_token = Help.generateToken(payload)
      res.status(200).json({access_token})
    } catch (err) {
      next(err)
    }
  }

  static async googleSign(req, res, next) {
    try {
      const google_token = req.headers.google_token
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const [user, created] = await User.findOrCreate({
      where : {email: payload.email},
      defaults: {
        username: payload.given_name,
        email: payload.email,
        password: 'google_secret',
      },
      hooks: false
    })

    const access_token = Help.generateToken({
      id: user.id
    })

    res.status(200).json({access_token, message: `login ok` })
    } catch (error) {
      console.log(error + `<<<<<`)
      next(error)
    }
  } 
}
module.exports = UserController