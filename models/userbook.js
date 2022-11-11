'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBook.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: "UserId required",
        },
        notEmpty: {
          args: true,
          msg: "UserId required",
        },
      },
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    BookId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: "BookId required",
        },
        notEmpty: {
          args: true,
          msg: "BookId required",
        },
      },
      references: {
        model: 'Books',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "status required",
        },
        notEmpty: {
          args: true,
          msg: "status required",
        },
      }
    }
  }, {
    sequelize,
    modelName: 'UserBook',
  });

  UserBook.beforeCreate((userBook, options) => {
    userBook.status = "Pending"
  })

  return UserBook;
};