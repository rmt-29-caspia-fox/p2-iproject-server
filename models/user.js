'use strict';
const {
  Model
} = require('sequelize');
const { encodePassword } = require('../helpers/bcrypt');
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
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email is already taken'
      },
      validate: {
        isEmail: {
          msg: "Invalid email"
        },
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        },
        islength(value) {
          if (value.length < 5) {
            throw new Error('Password length must be 5 or longer')
          }
        }
      }
    },
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, option) => {
    user.password = encodePassword(user.password);
  });
  return User;
};