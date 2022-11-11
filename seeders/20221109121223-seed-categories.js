'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const categories = require('../data/categories.json').map(category => {
    category.createdAt = category.updatedAt = new Date()
    return category
   })

   await queryInterface.bulkInsert('Categories', categories, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
