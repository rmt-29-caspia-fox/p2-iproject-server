'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const librarians = require('../data/librarians.json').map(librarian => {
    librarian.createdAt = librarian.updatedAt = new Date()
    return librarian
   });
   await queryInterface.bulkInsert('Librarians', librarians, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Librarians', null, {});
  }
};
