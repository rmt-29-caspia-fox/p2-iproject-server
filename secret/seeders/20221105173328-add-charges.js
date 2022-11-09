'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = require('../data/charges.json').map(el => {
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Charges', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Charges', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
