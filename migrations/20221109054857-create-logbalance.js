'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logbalances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nominal: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL
      },
      balance_before: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL
      },
      balance_now: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL
      },
      isDebit: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idReceiver: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      idProduct: {
        type: Sequelize.INTEGER
      },
      idSubproduct: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Logbalances');
  }
};