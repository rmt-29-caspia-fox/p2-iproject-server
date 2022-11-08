"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Bookmark, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: { msg: "username already being taken" },
        allowNull: false,
        validate: {
          notEmpty: { msg: `Username is required` },
          notNull: { msg: "Username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "email is required" },
          notNull: { msg: "email is required" },
          isEmail: { msg: "invalid email format" },
          len: {
            args: 5,
            msg: "password length minimum 5 characters",
          },
        },
        unique: { msg: "email already being registered" },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Password is required` },
          notNull: { msg: `Password is required` },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, option) => {
    user.password = hash(user.password);
  });

  return User;
};
