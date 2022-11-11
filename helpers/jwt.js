const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function encodeToken(payload) {
	return jwt.sign(payload, secret);
}

function decodeToken(token) {
	return jwt.verify(token, secret);
}

module.exports = { encodeToken, decodeToken };
