'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Category)
      Book.belongsTo(models.Librarian)
    }
  }
  Book.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "Name required",
        },
        notEmpty: {
          args: true,
          msg: "Name required",
        },
      }
    },
    authors: DataTypes.STRING,
    description: DataTypes.TEXT,
    publisher: DataTypes.STRING,
    publishDate: DataTypes.DATE,
    isbn13: DataTypes.INTEGER,
    isbn10: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    coverImage: DataTypes.STRING,
    CategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    LibrarianId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Librarian',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};