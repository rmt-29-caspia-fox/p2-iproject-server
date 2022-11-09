'use strict';
const {
  Model
} = require('sequelize');
const { hashPw } = require('../helpers');
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format",
        },
      },
      unique: {
        args: true,
        msg: "Email must be unique"
      }
    },
    password: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already registered"
      }
    },
    profilePic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,options)=>{
    user.password = hashPw(user.password)
  })
  return User;
};