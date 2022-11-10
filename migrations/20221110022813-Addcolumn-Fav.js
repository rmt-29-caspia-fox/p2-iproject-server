'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Favourites", "review", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Favourites", "shortDesc", {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Favourites", "review", {  });
    await queryInterface.removeColumn("Favourites", "shortDesc", {});
  }
};
