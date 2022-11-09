"use strict";
const { Model } = require("sequelize");
const { decodeBcrypt } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Product);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "email format invalid",
          },
          notNull: { msg: "email is required" },
          notEmpty: { msg: "email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" },
          notEmpty: { msg: "password is required" },
          len: {
            args: [8, 16],
            msg: "acceptable password length: 8-16 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks:{
        beforeCreate:(instance)=>{
          instance.password = decodeBcrypt(instance.password);
        }
      }
    }
  );
  return User;
};
