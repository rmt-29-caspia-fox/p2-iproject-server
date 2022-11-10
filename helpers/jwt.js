const jwt = require('jsonwebtoken');
const SECRET_CODE = process.env.JWT_KEY

function encodeToken(payload) {
    const access_token = jwt.sign(payload, SECRET_CODE);
    return access_token;
}

function decodeToken(token) {
    const payload = jwt.verify(token, SECRET_CODE);
    return payload;
}

module.exports = { decodeToken, encodeToken }; 