const {Game} = require('../models')

class GameController {
	static async getGames(req,res,next){
		try {
			const games = await Game.findAll()
			res.status(200).json({games})
		} catch (error) {
			console.log(error);
			next(error)
		}
	}
}


module.exports = GameController