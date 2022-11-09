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

    static async deleteFav(req, res, next) {
        try {
            const {id} = req.params
            const UserId = req.user.id
            await Favorite.destroy({where: {id, UserId}})
            res.status(200).json({message: 'Favorite has been deleted'})
        } catch (err) {
            next(err)
        }
    }

    static async getFav(req,res, next){
        try {
            const fav = await Favorite.findAll()
            res.status(200).json(fav)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = FavControl