const { Game,GameItem } = require('../models')

class GameItemController {
	static async getGameItems(req,res,next){
		try {
			const query = {
				include: [
					{
						model: Game
					},
				],
				order: [['id', 'ASC']]
			}

			const gameItems = await GameItem.findAll(query)
			res.status(200).json({gameItems	})
		} catch (error) {
			next(error)
		}
	}
}


module.exports = GameItemController