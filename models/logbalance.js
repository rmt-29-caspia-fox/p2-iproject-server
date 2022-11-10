'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logbalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logbalance.init({
    nominal: DataTypes.DECIMAL,
    isDebit: DataTypes.BOOLEAN,
    balance_before: DataTypes.DECIMAL,
    balance_now: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    idReceiver: DataTypes.STRING,
    phone: DataTypes.STRING,
    idProduct: DataTypes.INTEGER,
    idSubproduct: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Logbalance',
  });
  return Logbalance;
};