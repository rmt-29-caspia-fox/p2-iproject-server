const { Favorite } = require('../models');

const author = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fav = await Favorite.findByPk(id);
    if(!fav){
        throw {name: 'notFound'}
    }

    if (req.user.id !== fav.UserId) {
      throw { name: 'forbidden' };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = author;
