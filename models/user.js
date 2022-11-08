'use strict';
const {
  Model
} = require('sequelize');
const { hashedPassword } = require('../helpers');
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username is required'
        },
        notNull: {
          msg: 'username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg : 'email is already used'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email is required'
        },
        notNull: {
          msg: 'email is required'
        },
        isEmail: { 
          msg: "email format is incorrect"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password is required'
        },
        notNull: {
          msg: 'password is required'
        },
        len: {
          args: [6],
          msg: "Password's length minimum 6 character",
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'role is required'
        },
        notNull: {
          msg: 'role is required'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'phone number is required'
        },
        notNull: {
          msg: 'phone number is required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'address is required'
        },
        notNull: {
          msg: 'address is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashedPassword(user.password)
  })
  return User;
};