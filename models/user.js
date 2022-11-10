"use strict";
const { Model } = require("sequelize");
const { hashPw } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "E-mail is required" },
          notEmpty: { msg: "E-mail is required" },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User Name is required" },
          notEmpty: { msg: "User Name is required" },
        },
        unique: {
          args: true,
          msg: "Username already registered",
        },
      },
      profilePic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options) => {
    user.password = hashPw(user.password);
    user.profilePic = "template.png";
  });
  return User;
};
