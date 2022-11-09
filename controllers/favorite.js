const {Favorite} = require('../models');
const axios = require('axios');

class FavControl {

    static async addFav(req, res, next) {
        try {
            const {heroId} = req.params
            const {data} = await axios({
                url: 'https://api.dazelpro.com/mobile-legends/hero/'+ heroId,
                method: 'get'
            })
            const fav = await Favorite.create({UserId : 1, hero: data.hero})
            res.status(201).json(fav)
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = FavControl