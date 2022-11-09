'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.CandidateStudent)
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: {msg : 'Email is used'},
      validate: {
        notNull: {msg : 'Email is require'},
        notEmpty: {msg : 'Email is required'}
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull: {msg : 'Password is require'},
        notEmpty: {msg : 'Password is required'}
      }
    },
    phoneNumber: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notNull: {msg : 'Phone number is require'},
        notEmpty: {msg : 'Phone number is required'}
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull: {msg : 'Address is require'},
        notEmpty: {msg : 'Address is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })
  return User;
};