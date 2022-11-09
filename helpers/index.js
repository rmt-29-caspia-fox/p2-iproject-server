const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function hashPw(pw){
    return bcrypt.hashSync(pw, 7)
}

function comparePw(pw, hashedPw){
    return bcrypt.compareSync(pw, hashedPw)
}

function encodeToken(payload){
    return jwt.sign(payload, "HAHA")
}

function decodeToken(token){
    return jwt.verify(token, "HAHA")
}

module.exports = {
    hashPw,
    comparePw,
    encodeToken,
    decodeToken
}