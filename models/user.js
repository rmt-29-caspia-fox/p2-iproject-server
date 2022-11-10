"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { message: "Username is required" },
          notEmpty: { message: "Username is required" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { message: "Email is required" },
          notEmpty: { message: "Email is required" },
          isEmail: { message: "Invalid email format" },
        },
        unique: {
					args: true,
					message: "Email is already used" },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { message: "Password is required" },
          notEmpty: { message: "Password is required" },
        },
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
