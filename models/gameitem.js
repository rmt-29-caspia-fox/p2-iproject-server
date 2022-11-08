'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GameItem.belongsTo(models.Game, { foreignKey: 'GameId'})
    }
  }
  GameItem.init({
    GameId: DataTypes.INTEGER,
    item: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameItem',
  });
  return GameItem;
};