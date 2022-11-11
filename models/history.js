'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User)
      History.belongsTo(models.Product)
    }
  }
  History.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    ProvinceId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};