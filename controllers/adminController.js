const { Admin} = require('../models')

class AdminController{
    static async register (req,res,next) {
        try {
            const { username, email,password} = req.body
            const data = await Admin.create({username,email,password})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController