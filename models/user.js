'use strict';
const {
  Model
} = require('sequelize');
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "First name required",
        },
        notEmpty: {
          args: true,
          msg: "First name required",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Last name required",
        },
        notEmpty: {
          args: true,
          msg: "Last name required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email required",
        },
        notEmpty: {
          args: true,
          msg: "Email required",
        },
        isEmail: {
          args: true,
          msg: "please enter email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password required",
        },
        notEmpty: {
          args: true,
          msg: "Password required",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Phone number required",
        },
        notEmpty: {
          args: true,
          msg: "Phone number required",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password)
    user.role = 'User'
  })

  return User;
};