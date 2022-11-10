const { Deck } = require("../models")

class Authorization {
    static async deleteAuthorization(req, res, next) {
        try {
            const { id } = req.params;
            const deck = await Deck.findByPk(id);

            if (!deck) {
                throw new Error("Movie Not Found");
            }
            if (deck.UserId != req.user.id) {
                throw new Error("Forbidden");
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}
module.exports = Authorization;