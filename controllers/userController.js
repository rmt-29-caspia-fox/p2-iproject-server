const { where } = require('sequelize')
const { hashedPassword, signedToken, comparePassword } = require('../helpers')
const { OAuth2Client } = require('google-auth-library');
const {User} = require('../models/index')

class userController{
  static async addUser(req, res, next){
    try {
      const role = "Admin"
      const {fullName, email, password, phoneNumber, address} = req.body
      const user = await User.create({fullName, email, password, role, phoneNumber, address})
      const responseData = {
        id : user.id,
        email : user.email
      }
      res.status(201).json(responseData)
    } catch (err) {
      next(err)
    }
  }

  static async updateUser(req, res, next){
    try {
      let {id} = req.params
      const userFind = await User.findOne({where:{id}})
      if(!userFind){
        throw {name: "user_not_found"}
      }
      let {fullName, email, password, role, phoneNumber, address} = req.body
      password = hashedPassword(password)
      const user = await User.update({fullName, email, password, role, phoneNumber, address}, {
        where: {
          id: id
        }
      })
      const responseData = {
        id : id,
        email : email
      }
      res.status(201).json(responseData)
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next){
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where:{email}
      })
      if(!user){
        throw {name: 'invalid_login'}
      } else if(!comparePassword(password, user.password)){
        throw {name: 'invalid_login'}
      }
      const payload = {
        id : user.id
      }
      const access_token = signedToken(payload)
      res.status(200).json({access_token})
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next){
    try {
      const role = "Customer"
      const {fullName, email, password, phoneNumber, address} = req.body
      const user = await User.create({fullName, email, password, role, phoneNumber, address})
      const responseData = {
        id : user.id,
        email : user.email
      }
      res.status(201).json(responseData)
    } catch (err) {
      next(err)
    }
  }

  static async googleSignIn(req, res, next){
    try {
      const CLIENT_ID = process.env.CLIENT_ID
      const {google_token} = req.headers
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_ID,
      });

      const payload = ticket.getPayload()
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          fullName: payload.given_name + payload.family_name,  
          email: payload.email, 
          password: 'google-sign-in',
          role: 'Customer',
          phoneNumber: '0821000', 
          address: 'address google sign in'
        },
        hooks: false
      });

      const access_token = signedToken({
        id : user.id
      })

      res.status(200).json({access_token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController