'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      authors: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      publisher: {
        type: Sequelize.STRING
      },
      publishDate: {
        type: Sequelize.DATE
      },
      isbn13: {
        type: Sequelize.INTEGER
      },
      isbn10: {
        type: Sequelize.INTEGER
      },
      pages: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      coverImage: {
        type: Sequelize.STRING
      },
      CategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      LibrarianId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Librarians',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};