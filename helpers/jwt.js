const jwt = require("jsonwebtoken");

function encodeToken(payload) {
	return jwt.sign(payload, "SECRET");
}

function decodeToken(token) {
	return jwt.verify(token, "SECRET");
}

module.exports = { encodeToken, decodeToken };
