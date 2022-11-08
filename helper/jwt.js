const jwt = require('jsonwebtoken')

const miuw = 'It is better to be feared than loved, if you cannot be both'

jwtSign = (payload) => {
	return jwt.sign(payload, miuw)
}

jwtVerify = (token) => {
	return jwt.verify(token, miuw)
}

module.exports = {jwtSign, jwtVerify}