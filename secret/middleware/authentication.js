const { decode } = require("../helpers/jwt")
const {User} = require('../models');

const authentication = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token){
            throw {name: 'invalidToken'}
        }

        const payload = decode(access_token)

        const user = await User.findByPk(payload.id)
        if(!user){
            throw{name: 'invalidToken'}
        }
        req.user = {id: user.id, name: user.username}
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication