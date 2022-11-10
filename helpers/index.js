const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
function hashPw(pw){
    return bcrypt.hashSync(pw, 7)
}

function comparePw(pw, hashedPw){
    return bcrypt.compareSync(pw, hashedPw)
}

function encodeToken(payload){
    return jwt.sign(payload, SECRET)
}

function decodeToken(token){
    return jwt.verify(token, SECRET)
}

module.exports = {
    hashPw,
    comparePw,
    encodeToken,
    decodeToken
}