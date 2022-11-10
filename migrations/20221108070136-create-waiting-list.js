'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WaitingLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "requesting"
      },
      licenseNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      service: {
        allowNull:false,
        type: Sequelize.STRING,
        defaultValue: 'light'
      },
      CustomerId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'Customers'
        },
        onDelete : 'cascade',
        onUpdate : 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WaitingLists');
  }
};