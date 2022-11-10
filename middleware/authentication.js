const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models")

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw new Error("Invalid Token");
        }

        const payload = decodeToken(access_token);
        if (!payload) {
            throw new Error("Invalid Token");
        }

        const user = await User.findByPk(payload.id);
        if (!user) {
            throw new Error("Invalid Token");
        }

        req.user = {
            id: user.id,
            role: user.role
        }
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;