"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User)
    }
  }
  Favourite.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      googleId: DataTypes.STRING,
      author: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      review: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Must be higher than one!",
          },
          max: {
            args: 5,
            msg: "Must be below five!",
          },
        },
      },
      shortDesc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Favourite",
      hooks:{
        beforeCreate:(instance)=>{
          instance.review = null
          instance.shortDesc = null;
        }
      }
    }
  );
  return Favourite;
};
